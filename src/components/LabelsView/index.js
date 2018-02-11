import React from 'react'
import { ICON_CLOSE } from '../../icons'
import './style.css'

export const LabelsView = props => (
  <div id="labels-view">
    <button className="icon-button close" onClick={props.toggleLabelsView}>
      <i className="material-icons">{ ICON_CLOSE }</i>
    </button>

    <h1>
      { props.oldLabel ? 'Edit label' : 'Create a new label'}
    </h1>

    <label htmlFor="label-name">
      Name ({props.maxNameLength} max characters)
    </label>

    <input id="name" type="text" 
      maxLength={props.maxNameLength} 
      onChange={e => props.handleChange(e)} 
      value={props.newLabel.name} 
    />

    <div id="label-colors">
      { 
        props.labelColors.map(v => 
          <button className="color" id="color" 
            value={v}
            key={v}
            style={{ 
              backgroundColor: v, 
              border: (v === props.newLabel.color) ? 'solid 3px white' : ''
            }} 
            onClick={e => props.handleChange(e)}>
          </button>
        ) 
      }
    </div>

    <label htmlFor="move-to-check">Move completed data</label>

    <input id="moveToPath"  type="text" 
      onChange={e => props.handleChange(e)} 
      value={props.newLabel.moveToPath}
      placeholder={props.oldLabel ? props.oldLabel.moveToPath : '/to/some/path'} 
    />

    <button className="button" 
      disabled={props.disableUpdate} 
      onClick={props.updateLabel}>
        { props.oldLabel ? 'Update' : 'Create' } Label
    </button>

    <button className="button" onClick={props.resetLabel}>
        Reset
    </button>

    { props.oldLabel && (
      <div style={{ display: 'inline-block' }}>
        <input id="confirmDelete" type="text" 
          placeholder={props.oldLabel.name} 
          value={props.confirmDelete} 
          onChange={e => props.handleChange(e)}
        />
        <button className="button" 
          disabled={props.oldLabel.name !== props.confirmDelete}
          onClick={props.deleteLabel}>
            Delete Label
        </button>
      </div>
    )}
  </div>
)


export default LabelsView
