const http = require('http')
const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')
const cards = require('../src/shared/topTrumpsCards')

const CATEGORIES = cards.CATEGORIES
const PORT = process.env.PORT || 4001

const app = express()
app.use(cors())
app.get('/', (req, res) => res.send('Top Trumps socket server is running'))

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

// One open seat waiting for an opponent; anyone else who joins pairs up
// with them immediately, so multiple independent 1v1 games can run at once.
let waitingPlayer = null
const rooms = new Map()

function shuffledDeck() {
  const deck = cards.map(c => ({ ...c }))
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

function sendState(room) {
  const [idA, idB] = room.players
  ;[[idA, idB], [idB, idA]].forEach(([id, opponentId]) => {
    const socket = io.sockets.sockets.get(id)
    if (!socket) return
    socket.emit('state', {
      yourTopCard: room.decks[id][0] || null,
      yourCount: room.decks[id].length,
      opponentCount: room.decks[opponentId].length,
      yourTurn: room.turn === id,
      pot: room.pot.length,
      categories: CATEGORIES,
    })
  })
}

function cleanupSocket(socket) {
  if (waitingPlayer && waitingPlayer.id === socket.id) waitingPlayer = null
  const room = rooms.get(socket.roomId)
  if (!room) return
  const opponentId = room.players.find(p => p !== socket.id)
  const opponentSocket = io.sockets.sockets.get(opponentId)
  if (opponentSocket) opponentSocket.emit('opponentDisconnected')
  rooms.delete(room.id)
}

io.on('connection', socket => {
  socket.on('join', ({ name }) => {
    socket.playerName = String(name || 'Player').slice(0, 20) || 'Player'

    if (waitingPlayer && waitingPlayer.connected && waitingPlayer.id !== socket.id) {
      const opponent = waitingPlayer
      waitingPlayer = null

      const roomId = `room-${opponent.id}-${socket.id}`
      const deck = shuffledDeck()
      const half = Math.floor(deck.length / 2)

      const room = {
        id: roomId,
        players: [opponent.id, socket.id],
        names: { [opponent.id]: opponent.playerName, [socket.id]: socket.playerName },
        decks: { [opponent.id]: deck.slice(0, half), [socket.id]: deck.slice(half) },
        pot: [],
        turn: Math.random() < 0.5 ? opponent.id : socket.id,
      }
      rooms.set(roomId, room)
      opponent.roomId = roomId
      socket.roomId = roomId
      opponent.join(roomId)
      socket.join(roomId)

      opponent.emit('matched', { opponentName: socket.playerName })
      socket.emit('matched', { opponentName: opponent.playerName })
      sendState(room)
    } else {
      waitingPlayer = socket
      socket.emit('waiting')
    }
  })

  socket.on('pickStat', ({ stat }) => {
    const room = rooms.get(socket.roomId)
    if (!room || room.turn !== socket.id || !CATEGORIES.includes(stat)) return

    const [idA, idB] = room.players
    const cardA = room.decks[idA][0]
    const cardB = room.decks[idB][0]
    if (!cardA || !cardB) return

    const valA = cardA[stat]
    const valB = cardB[stat]

    room.decks[idA] = room.decks[idA].slice(1)
    room.decks[idB] = room.decks[idB].slice(1)

    let winnerId = null
    if (valA > valB) winnerId = idA
    else if (valB > valA) winnerId = idB

    const wonCards = [cardA, cardB, ...room.pot]
    room.pot = []

    if (winnerId) {
      room.decks[winnerId] = [...room.decks[winnerId], ...wonCards]
      room.turn = winnerId
    } else {
      // Tie: the pot carries over and the same player picks again.
      room.pot = wonCards
    }

    io.to(room.id).emit('roundResult', {
      stat,
      values: { [idA]: valA, [idB]: valB },
      cards: { [idA]: cardA, [idB]: cardB },
      winnerName: winnerId ? room.names[winnerId] : null,
      tie: !winnerId,
    })

    const loserId = room.players.find(id => room.decks[id].length === 0)
    if (loserId) {
      const winnerFinal = room.players.find(id => id !== loserId)
      io.to(room.id).emit('gameOver', { winnerName: room.names[winnerFinal] })
      rooms.delete(room.id)
      return
    }

    sendState(room)
  })

  socket.on('leaveGame', () => cleanupSocket(socket))
  socket.on('disconnect', () => cleanupSocket(socket))
})

server.listen(PORT, () => console.log(`Top Trumps socket server listening on :${PORT}`))
