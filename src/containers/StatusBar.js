import React, { Component } from 'react'
import { connect } from 'react-redux'
import humanFormat from 'human-format'
import bpsScale from '../bps-scale'
import StatusBar from '../components/StatusBar'

class StatusBarContainer extends Component {
  render () {
    return React.createElement(StatusBar, this.props)
  }
}

const mapStateToProps = state => {
  let totalDown = 0, totalUp = 0
  for (let i in state.torrents.progress) {
    let progress = state.torrents.progress[i]
    totalDown += progress.bpsDown
    totalUp += progress.bpsUp
  }

  return {
    download: humanFormat(totalDown, { scale: bpsScale }),
    upload: humanFormat(totalUp, { scale: bpsScale })
  }
}

export default connect(mapStateToProps)(StatusBarContainer)
