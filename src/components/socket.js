import { io } from 'socket.io-client'

// Override with REACT_APP_SOCKET_URL when the socket server isn't on localhost
// (e.g. deployed separately from the React app).
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4001'

export const socket = io(SOCKET_URL, { autoConnect: false })
