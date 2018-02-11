import React from 'react'
import { ICON_LABEL, ICON_ADD } from '../../icons'
import './style.css'

export const LabelsPanel = props => (
  <div id="labels-panel" className="side-panel">
  <h2>
    {props.labels.length} TOTAL LABELS
  </h2>
    <ul>
      <li onClick={() => props.setLabel(null)}>
        <i className="material-icons">{ICON_ADD}</i>
        add new label
      </li>
      { props.labels.map(lbl => 
          <li key={lbl.id} onClick={() => props.setLabel(lbl.id)}>
            <i className="material-icons" style={{ color: lbl.color}}>{ICON_LABEL}</i>
            {lbl.name}
          </li>
        )
      }
    </ul>
  </div>
)

export default LabelsPanel
