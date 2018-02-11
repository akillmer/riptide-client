import React from 'react'
import './style.css'
import { ICON_DOWNLOAD, ICON_UPLOAD, ICON_LABEL } from '../../icons'

const StatusBar = props => (
  <div id="status-bar">
    <div className="speeds">
      <div>
        <i className="material-icons">{ ICON_DOWNLOAD }</i>{ props.download }
      </div>
      <div>
      { props.upload }<i className="material-icons">{ ICON_UPLOAD }</i>
      </div>
    </div>
    <div className="menu">
      <button className="icon-button" onClick={props.toggleLabelsView}>
        <i className="material-icons">{ ICON_LABEL }</i>
      </button>
    </div>
  </div>
)

export default StatusBar