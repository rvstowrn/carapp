import React, { useCallback, useEffect, useState } from 'react'
import { socket } from './socket.js'
import './styles.css'

const STAT_LABELS = { Mileage: 'Mileage (km/l)', Engine: 'Engine (cc)', BHP: 'BHP', Seats: 'Seats' }

function describeRound(r) {
  const you = r.values[socket.id]
  const oppId = Object.keys(r.values).find(id => id !== socket.id)
  const opp = r.values[oppId]
  const label = STAT_LABELS[r.stat] || r.stat
  if (r.tie) return `${label}: ${you} vs ${opp} — tie, cards held in the pot`
  return `${label}: ${you} vs ${opp} — ${r.winnerName} wins the round`
}

function TrumpCard({ card, categories, interactive, onPick }) {
  if (!card) return null
  return (
    <div className='trumpCard'>
      <h3>{card.Company}</h3>
      <h4>{card.Model}</h4>
      <ul>
        {categories.map(stat => (
          <li key={stat}>
            {interactive ? (
              <button className='statBtn' onClick={() => onPick(stat)}>
                <span>{STAT_LABELS[stat] || stat}</span><span>{card[stat]}</span>
              </button>
            ) : (
              <div className='statRow'>
                <span>{STAT_LABELS[stat] || stat}</span><span>{card[stat]}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TopTrumps() {
  const [name, setName] = useState('')
  const [phase, setPhase] = useState('idle') // idle | waiting | playing | over
  const [opponentName, setOpponentName] = useState('')
  const [state, setState] = useState(null)
  const [lastRound, setLastRound] = useState(null)
  const [log, setLog] = useState([])
  const [winnerName, setWinnerName] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const onWaiting = () => setPhase('waiting')
    const onMatched = ({ opponentName }) => {
      setOpponentName(opponentName)
      setPhase('playing')
      setLastRound(null)
      setLog([])
      setError('')
    }
    const onState = s => setState(s)
    const onRoundResult = r => {
      setLastRound(r)
      setLog(prev => [describeRound(r), ...prev].slice(0, 8))
    }
    const onGameOver = ({ winnerName }) => {
      setWinnerName(winnerName)
      setPhase('over')
    }
    const onOpponentDisconnected = () => {
      setError('Your opponent disconnected.')
      setPhase('idle')
      setState(null)
    }
    const onConnectError = () => setError('Could not reach the game server. Is it running?')

    socket.on('waiting', onWaiting)
    socket.on('matched', onMatched)
    socket.on('state', onState)
    socket.on('roundResult', onRoundResult)
    socket.on('gameOver', onGameOver)
    socket.on('opponentDisconnected', onOpponentDisconnected)
    socket.on('connect_error', onConnectError)

    return () => {
      socket.off('waiting', onWaiting)
      socket.off('matched', onMatched)
      socket.off('state', onState)
      socket.off('roundResult', onRoundResult)
      socket.off('gameOver', onGameOver)
      socket.off('opponentDisconnected', onOpponentDisconnected)
      socket.off('connect_error', onConnectError)
      socket.disconnect()
    }
  }, [])

  const findMatch = useCallback(() => {
    setError('')
    if (!socket.connected) socket.connect()
    socket.emit('join', { name: name.trim() || 'Player' })
  }, [name])

  const pickStat = stat => socket.emit('pickStat', { stat })

  const playAgain = () => {
    setPhase('idle')
    setWinnerName(null)
    setState(null)
    setLastRound(null)
    setLog([])
  }

  return (
    <div id='trumpsDiv'>
      <div className='trumpsPanel'>
        {error && <p className='trumpsError'>{error}</p>}

        {phase === 'idle' && (
          <div className='trumpsLobby'>
            <p>Play Top Trumps head-to-head over a live socket connection.</p>
            <input
              className='trumpsInput'
              placeholder='Your name'
              value={name}
              maxLength={20}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && findMatch()}
            />
            <button className='trumpsBtn' onClick={findMatch}>Find Opponent</button>
          </div>
        )}

        {phase === 'waiting' && (
          <div className='trumpsLobby'>
            <p>Waiting for another player to join…</p>
          </div>
        )}

        {phase === 'playing' && state && (
          <div className='trumpsGame'>
            <div className='trumpsScoreRow'>
              <span>You: {state.yourCount} cards</span>
              <span>{opponentName}: {state.opponentCount} cards</span>
            </div>
            {state.pot > 0 && <p className='trumpsPot'>{state.pot} card(s) tied and sitting in the pot</p>}

            <p className='trumpsTurn'>
              {state.yourTurn ? 'Your turn — pick a stat!' : `Waiting for ${opponentName} to pick…`}
            </p>

            <TrumpCard
              card={state.yourTopCard}
              categories={state.categories}
              interactive={state.yourTurn}
              onPick={pickStat}
            />

            {lastRound && (
              <p className='trumpsLastRound'>{describeRound(lastRound)}</p>
            )}

            {log.length > 0 && (
              <ul className='trumpsLog'>
                {log.map((entry, i) => <li key={i}>{entry}</li>)}
              </ul>
            )}
          </div>
        )}

        {phase === 'over' && (
          <div className='trumpsLobby'>
            <h3>{winnerName} wins the game!</h3>
            <button className='trumpsBtn' onClick={playAgain}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  )
}
