import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTorrent } from '../store/actions/torrents'
import { emit } from '../store/socket-middleware'
import MagnetBar from '../components/MagnetBar'

class MagnetBarContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uri: ''
    }
  }

  handleEnterKey (event) {
    if (event.keyCode === 13) {
      this.sendURI()
      event.target.blur()
    }
  }

  handleChange (event) {
    this.setState({ uri: event.target.value })
  }

  sendURI () {
    if (this.state.uri.length > 0) {
      emit(addTorrent(this.state.uri))
      this.setState({ uri: '' })
    }
  }

  render () {
    return React.createElement(MagnetBar, {
      ...this.state,
      handleEnterKey: this.handleEnterKey.bind(this),
      handleChange: this.handleChange.bind(this),
      sendURI: this.sendURI.bind(this)
    })
  }
}

export default connect()(MagnetBarContainer)
