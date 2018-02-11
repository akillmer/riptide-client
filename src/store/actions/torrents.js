export const TORRENT_ADD = 'TORRENT_ADD'
export const TORRENT_STOP = 'TORRENT_STOP'
export const TORRENT_INFO = 'TORRENT_INFO'
export const TORRENT_PROGRESS = 'TORRENT_PROGRESS'
export const TORRENT_FORCE = 'TORRENT_FORCE'
export const TORRENT_DELETE = 'TORRENT_DELETE'
export const TORRENT_LABEL_SET = 'TORRENT_LABEL_SET'

export const addTorrent = uri => {
  return {
    type: TORRENT_ADD,
    payload: uri
  }
}

export const deleteTorrent = (hash, withData = false) => {
  return {
    type: TORRENT_DELETE,
    payload: { hash, withData }
  }
}

export const stopTorrent = hash => {
  return {
    type: TORRENT_STOP,
    payload: hash
  }
}

export const startTorrent = magnet => {
  return {
    type: TORRENT_ADD,
    payload: magnet
  }
}

export const forceTorrent = hash => {
  return {
    type: TORRENT_FORCE,
    payload: hash
  }
}

export const setTorrentLabel = (hash, labelID) => {
  return {
    type: TORRENT_LABEL_SET,
    payload: { hash, labelID }
  }
}

export const removeTorrentLabel = hash => {
  return {
    type: TORRENT_LABEL_SET,
    payload: { hash }
  }
}
