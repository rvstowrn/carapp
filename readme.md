# React based car selling application (Tinder Swipe Based Architecture)

## clone and run following command on cmd

### npm i
### npm start


#### working example on carswipe.netlify.com

## Top Trumps (real-time multiplayer)

`/TopTrumps` is a live 1v1 Top Trumps game played over a socket.io connection.
It needs the socket server running alongside the React app:

### npm run server        (starts the socket server on :4001)
### npm start              (starts the React app, in another terminal)

or run both together:

### npm run dev

Two browser tabs (or two devices) can each open `/TopTrumps`, enter a name,
and click "Find Opponent" — the server pairs the first two players that join
into a room, deals out the shared car-stats deck, and referees the rounds.
Set `REACT_APP_SOCKET_URL` if the socket server isn't on `localhost:4001`.
