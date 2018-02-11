import { APP_ERROR } from './actions/app'

export const SOCKET_SEND = 'SOCKET_SEND'
export const SOCKET_CONNECT = 'SOCKET_CONNECT'

export const connectToSocket = uri => {
  return {
    type: SOCKET_CONNECT,
    payload: { uri }
  }
}

export const emit = (action) => {
  ws.send(JSON.stringify(action))
}

let ws
const socketMiddleware = store => next => action => {
  switch (action.type) {
    case SOCKET_CONNECT:
      ws = new WebSocket(action.payload.uri)
      ws.onmessage = event => {
        let msg = JSON.parse(event.data)
        store.dispatch(msg)
      }
      ws.onerror = event => {
        // todo: dispatch to an error log
        console.error(event.data)
      }
      break

    case SOCKET_SEND:
      emit(action)
      break

     case APP_ERROR:
      // just for now until a custom solution is implemented
      alert('Error from server: ' + action.payload)
      break

    default:
      break
  }
  return next(action)
}

export default socketMiddleware
