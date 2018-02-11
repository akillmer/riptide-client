import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FILTER_ACTIVE, FILTER_QUEUED, FILTER_STOPPED, FILTER_PENDING,
  FILTER_DONE, FILTER_SEEDING, FILTER_ALL } from '../store/actions/filter'
import { connectToSocket } from '../store/socket-middleware'
import * as STATUS from '../torrent-status'
import Torrent from '../containers/Torrent'
import FilterPanel from '../containers/FilterPanel'
import MagnetBar from '../containers/MagnetBar'
import StatusBar from '../containers/StatusBar'
import LabelsView from '../containers/LabelsView'
import LabelsPanel from '../containers/LabelsPanel'

import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      showLabelsView: false,
      viewLabelID: null 
    }
  }

  toggleLabelsView () {
    this.setState({ 
      showLabelsView: !this.state.showLabelsView,
      viewLabelID: null
    })
  }

  setLabelViewID (id) {
    let s = {...this.state}
    s.viewLabelID = id
    this.setState(s)
  }

  componentDidMount () {
    let uri = ''
    if (process.env.NODE_ENV === 'development') {
      uri = 'ws://localhost:6500/api'
    } else {
      uri = `ws://${window.location.hostname}:${window.location.port}/api`
    }
    this.props.dispatch(connectToSocket(uri))
  }

  render () {
    let view
    // labels view persists the selected label id, even after it's deleted.
    let label = this.props.labels.find(v => v.id === this.state.viewLabelID)
    
    if (this.state.showLabelsView) {
      view = (
        <div>
          <LabelsPanel setLabel={id => this.setLabelViewID(id)} />
          <div id="view">
            <LabelsView toggleLabelsView={() => this.toggleLabelsView()} 
              label={label} />
          </div>
        </div>
      )
    } else {
      view = (
        <div>
          <FilterPanel />
          <div id="view">
            <MagnetBar />
            { this.props.torrents.map(t => <Torrent key={t.hash} {...t} />) }
          </div>
        </div>
      )
    }

    return (
      <div className="App">
        { view }
        <StatusBar toggleLabelsView={() => this.toggleLabelsView()} />
        <div id="log">
        </div>
      </div>
    )
  }
}

const getVisibleTorrents = (torrents, filter) => {
  switch (filter) {
    case FILTER_ACTIVE:
      return torrents.filter(t => t.status === STATUS.ACTIVE)
    case FILTER_QUEUED:
      return torrents.filter(t => t.status === STATUS.QUEUED)
    case FILTER_STOPPED:
      return torrents.filter(t => t.status === STATUS.STOPPED)
    case FILTER_PENDING:
      return torrents.filter(t => t.status === STATUS.PENDING)
    case FILTER_DONE:
      return torrents.filter(t => t.status === STATUS.DONE)
    case FILTER_SEEDING:
      return torrents.filter(t => t.status === STATUS.SEEDING)
    case FILTER_ALL:
    default:
      let t = torrents.filter(t => t.labelID === filter)
      if (t.length === 0) {
        return [...torrents]
      }
      return t
  }
}

const mapStateToProps = state => {
  return {
    currentFilter: state.filter,
    torrents: getVisibleTorrents(state.torrents.info, state.filter),
    labels: state.labels
  }
}

export default connect(mapStateToProps)(App)
