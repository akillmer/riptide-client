import { emit } from '../socket-middleware'
import { APP_INIT } from '../actions/app'
import { TORRENT_INFO, TORRENT_PROGRESS, TORRENT_DELETE, TORRENT_FORCE } from '../actions/torrents'
import { FORCING } from '../../torrent-status'

export const initialState = {
  info: [],
  progress: []
}

const torrents = (state = initialState, action) => {
  let info = [...state.info]
  let progress = [...state.progress]

  switch (action.type) {
    case APP_INIT: {
      info = action.payload.torrents

      if (info === null) {
        return state
      }

      info.sort((a, b) => a.timeAdded > b.timeAdded)
      return { info, progress }
    }

    case TORRENT_INFO: {
      let i = info.findIndex(t => t.hash === action.payload.hash)
      if (i === -1) { // this is a new torrent
        info.push(action.payload)
      } else {
        info[i] = action.payload
      }
      return { info, progress }
    }

    case TORRENT_PROGRESS: {
      let i = progress.findIndex(t => t.hash === action.payload.hash)
      if (i === -1) {
        progress.push(action.payload)
      } else {
        progress[i] = action.payload
      }
      return { info, progress }
    }

    case TORRENT_DELETE: {
      let infoIndex = info.findIndex(t => t.hash === action.payload)
      if (infoIndex > -1) {
        info.splice(infoIndex, 1)
      }
      let progressIndex = progress.findIndex(t => t.hash === action.payload)
      if (progressIndex > -1) {
        progress.splice(progressIndex, 1)
      }
      return { info, progress }
    }

    case TORRENT_FORCE: {
      let i = info.findIndex(t => t.hash === action.payload)
      if (i > -1) {
        info[i].status = FORCING
        emit(action)
      }
      return { info, progress }
    }

    default:
      return state
  }
}

export default torrents
