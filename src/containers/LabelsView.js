import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateLabel, deleteLabel } from '../store/actions/labels'
import { emit } from '../store/socket-middleware'
import LabelsView from '../components/LabelsView'

class LabelsViewContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDelete: '',
      oldLabel: null, 
      newLabel: {...newLabel}
    }
  }

  handleChange (event) {
    let s = { ...this.state }
    let key = event.target.id
    let val = event.target.value

    if (key in s.newLabel) {
      s.newLabel[key] = val
    } else if (key in s) {
      s[key] = val
    }

    this.setState(s)
  }

  resetLabel () {
    if (this.state.oldLabel === null) {
      this.setState({
        confirmDelete: '',
        oldLabel: null, 
        newLabel: {...newLabel}
      })
    } else {
      this.setState({
        confirmDelete: '',
        oldLabel: {...this.state.oldLabel}, 
        newLabel: {...newLabel}
      })
    }
  }

  disableUpdate () {
    let oldLabel = this.state.oldLabel
    let newLabel = this.state.newLabel

    if (oldLabel !== null) {
      if (oldLabel.name !== newLabel.name) {
        return false
      } else if (oldLabel.color !== newLabel.color) {
        return false
      } else if (oldLabel.moveToPath !== newLabel.moveToPath) {
        return false
      }
      return true
    }

    return newLabel.name === ''
  }

  deleteLabel () {
    emit(deleteLabel(this.state.oldLabel.id))
    this.setState({ 
      confirmDelete: '',
      oldLabel: null, 
      newLabel: {...newLabel}
    })
  }

  componentWillReceiveProps (nextProps) {
    let s

    if (nextProps.label === undefined) {
      s = { 
        oldLabel: null, 
        newLabel: {...newLabel}
      }
      s.newLabel.color = labelColors[0]
    }
    else {
      s = { 
        oldLabel: {...nextProps.label}, 
        newLabel: {...nextProps.label} 
      }
    }
    
    this.setState(s)
  }

  render () {
    return React.createElement(LabelsView, {
      ...this.state,
      labelColors,
      maxNameLength: 20,
      disableUpdate: this.disableUpdate(),
      toggleLabelsView: () => this.props.toggleLabelsView(),
      handleChange: e => this.handleChange(e),
      resetLabel: () => this.resetLabel(),
      updateLabel: () => emit(updateLabel(this.state.newLabel)),
      deleteLabel: () => this.deleteLabel()
    })
  }
}

const labelColors = ['#f5b7b1', '#d2b4de', '#aed6f1',
  '#a3e4d7', '#f9e79f', '#edbb99']

const newLabel = {
  id: null,
  name: '',
  moveToPath: '',
  color: labelColors[0]
}

export default connect()(LabelsViewContainer)
