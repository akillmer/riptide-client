import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../store/actions/filter'
import * as STATUS from '../torrent-status'
import FilterPanel from '../components/FilterPanel'

class FilterPanelContainer extends Component {
  render () {
    return React.createElement(FilterPanel, this.props)
  }
}

const mapStateToProps = (state, props) => {
  const counts = {}
  counts[STATUS.ACTIVE] = 0
  counts[STATUS.QUEUED] = 0
  counts[STATUS.SEEDING] = 0
  counts[STATUS.STOPPED] = 0
  counts[STATUS.DONE] = 0

  state.torrents.info.forEach(t => {
    counts[t.status]++

    if (counts[t.labelID] === undefined) {
      counts[t.labelID] = 1
    } else {
      counts[t.labelID]++
    }
  })

  return {
    totalTorrents: state.torrents.info.length,
    counts,
    labels: state.labels.filter(v => counts[v.id])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilter: filter => dispatch(setVisibilityFilter(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanelContainer)
