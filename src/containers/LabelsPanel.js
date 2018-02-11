import React, { Component } from 'react'
import { connect } from 'react-redux'
import LabelsPanel from '../components/LabelsPanel'

class LabelsPanelContainer extends Component {
  render () {
    return React.createElement(LabelsPanel, this.props)
  }
}

const mapStateToProps = state => {
  return {
    labels: state.labels
  }
}

export default connect(mapStateToProps)(LabelsPanelContainer)
