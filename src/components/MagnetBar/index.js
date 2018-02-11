import React from 'react'
import { ICON_ADD } from '../../icons'
import './style.css'

export const MagnetBar = props => (
  <div id="magnet-bar">
    <input id="magnet-uri" type="text" placeholder="magnet:" 
      value={props.uri} onChange={props.handleChange} onKeyDown={props.handleEnterKey} />
    <button className="icon-button" onClick={props.sendURI} disabled={props.uri === '' ? true : false}>
      <i className="material-icons">{ICON_ADD}</i>
    </button>
  </div>
)

export default MagnetBar
