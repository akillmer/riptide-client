import React, { Component } from 'react'
import { connect } from 'react-redux'
import humanFormat from 'human-format'
import humanDate from 'human-date'
import bpsScale from '../bps-scale'
import Torrent from '../components/Torrent'
import { emit } from '../store/socket-middleware'
import { stopTorrent, startTorrent, forceTorrent, setTorrentLabel, 
  removeTorrentLabel, deleteTorrent } from '../store/actions/torrents'
import * as STATUS from '../torrent-status'
import { ICON_PENDING, ICON_STOP_TORRENT, ICON_START_TORRENT,
  ICON_DONE, ICON_FORCE } from '../icons'

class TorrentContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDelete: false,
      deleteData: false
    }
  }

  displayName () {
    if (this.props.name === '') {
      return this.props.hash
    }
    return this.props.name
  }

  toggleStatusButton () {
    switch (this.props.status) {
      case STATUS.PENDING:
        return {
          icon: ICON_PENDING,
          disabled: true
        }
      case STATUS.ACTIVE:
      case STATUS.SEEDING:
        return {
          icon: ICON_STOP_TORRENT,
          disabled: false,
          click: () => emit(stopTorrent(this.props.hash))
        }
      case STATUS.QUEUED:
        return {
          icon: ICON_FORCE,
          disabled: false,
          click: () => this.props.forceTorrent()
        }
      case STATUS.STOPPED:
        return {
          icon: ICON_START_TORRENT,
          disabled: false,
          click: () => emit(startTorrent(this.props.magnet))
        }
      case STATUS.DONE:
        return {
          icon: ICON_DONE,
          disabled: true
        }
      case STATUS.FORCING:
        return {
          icon: ICON_FORCE,
          disabled: true
        }
      default:
        return {
          icon: '',
          disabled: true
        }
    }
  }

  getStatusText () {
    switch (this.props.status) {
      case STATUS.ACTIVE:
        return 'Downloading'
      case STATUS.PENDING:
        return 'Pending meta...'
      case STATUS.QUEUED:
        return 'Queued'
      case STATUS.SEEDING:
        return 'Seeding'
      case STATUS.STOPPED:
        return 'Stopped'
      case STATUS.DONE:
        return 'Completed'
      case STATUS.FORCING:
        return 'Skipping queue...'
      default:
        return this.props.status
    }
  }

  toggleShowDelete () {
    this.setState({
      showDelete: !this.state.showDelete,
      deleteData: false
    })
  }

  confirmDelete () {
    emit(deleteTorrent(this.props.hash, this.state.deleteData))
  }

  toggleDeleteData (b) {
    this.setState({...this.state, deleteData: !this.state.deleteData})
  }

  getETA () {
    let secondsLeft = (this.props.totalBytes - this.props.bytesCompleted) / this.props.bpsDown

    if (this.props.status !== (STATUS.ACTIVE || STATUS.SEEDING)) {
      return this.getStatusText()
    } else if (isNaN(secondsLeft)) {
      return this.getStatusText()
    }

    let time = humanDate.relativeTime(Math.round(secondsLeft), { returnObject: true })

    if (time.years === 1) {
      return '1 year remaining'
    } else if (time.years > 1) {
      return `${time.years} years remaining`
    }

    if (time.months === 1) {
      return '1 month remaining'
    } else if (time.months > 1) {
      return `${time.month} remaining`
    }

    if (time.weeks === 1) {
      return '1 week remaining'
    } else if (time.weeks > 1) {
      return `${time.weeks} weeks remaining`
    }

    if (time.days === 1) {
      return '1 day remaining'
    } else if (time.days > 1) {
      return `${time.days} days remaining`
    }

    if (time.hours === 1) {
      return '1 hour remaining'
    } else if (time.hours > 1) {
      return `${time.hours} hours remaining`
    }

    if (time.minutes === 1) {
      return '1 minute remaining'
    } else if (time.minutes > 1) {
      return `${time.minutes} minutes remaining`
    }

    if (time.seconds === 1) {
      return '1 second remaining'
    }

    return `${time.seconds} seconds remaining`
  }

  setLabel (id) {
    if (id === 'no-label') {
      emit(removeTorrentLabel(this.props.hash))
    } else if (this.props.allLabels.findIndex(v => v.id === id) !== -1) {
      emit(setTorrentLabel(this.props.hash, id))
    }
  }

  render () {
    let progressBarStyle
    let progress = (this.props.bytesCompleted / this.props.totalBytes) * 100
    if (this.props.status === STATUS.DONE || this.props.status === STATUS.SEEDING) {
      progressBarStyle = { width: '100%' }
    } else if (isNaN(progress)) {
      progressBarStyle = { width: '0' }
    } else {
      progressBarStyle = { width: `${progress}%` }
    }

    let name = this.props.name === '' ? this.props.hash : this.props.name
    let totalBytes = this.props.status === STATUS.PENDING
      ? '' : humanFormat(this.props.totalBytes)

    let bytesCompleted = isNaN(this.props.bytesCompleted)
      ? 0 : humanFormat(this.props.bytesCompleted)

    let bpsDown = isNaN(this.props.bpsDown)
      ? 0 : humanFormat(this.props.bpsDown, { scale: bpsScale })

    let bpsUp = isNaN(this.props.bpsUp)
      ? 0 : humanFormat(this.props.bpsUp, { scale: bpsScale })

    let peers = isNaN(this.props.totalPeers)
      ? 0 : `${this.props.activePeers} / ${this.props.totalPeers}`

    let ratio = isNaN(this.props.ratio) ? 0 : this.props.ratio.toFixed(2)

    return React.createElement(Torrent, {
      ...this.state,
      ...this.props,
      name,
      progressBarStyle,
      totalBytes,
      bytesCompleted,
      bpsDown,
      bpsUp,
      peers,
      ratio,
      eta: this.getETA(),
      toggle: this.toggleStatusButton(),
      setLabel: this.setLabel.bind(this),
      toggleShowDelete: this.toggleShowDelete.bind(this),
      confirmDelete: this.confirmDelete.bind(this),
      toggleDeleteData: this.toggleDeleteData.bind(this)
    })
  }
}

const mapStateToProps = (state, props) => {
  let s = {
    ...state.torrents.progress.find(t => t.hash === props.hash),
    ...state.torrents.info.find(t => t.hash === props.hash),
    allLabels: Object.values(state.labels).map(v => delete v.moveTo ? v : v)
  }
  if (s.labelID !== '') {
    return {...s, label: state.labels.find(v => v.id === s.labelID)}
  }
  
  return { ...s, label: null }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    forceTorrent: () => dispatch(forceTorrent(props.hash))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TorrentContainer)
