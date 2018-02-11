import React from 'react'
import { ICON_LABEL, ICON_DELETE_TORRENT, ICON_ETA, ICON_CANCEL,
  ICON_DOWNLOAD, ICON_UPLOAD, ICON_PEERS, ICON_RATIO } from '../../icons'
import { ACTIVE, SEEDING } from '../../torrent-status'
import './style.css'

const Torrent = t => {
  let labelStyle = (t.label === null) ? { color: 'white' } : { color: t.label.color }
  let activeClass = (t.status === ACTIVE || t.status === SEEDING)
    ? 'active-stats-show' : 'active-stats-hide'
  let header = t.showDelete ? (
    <div className="confirm-delete">
      <button className="delete button" onClick={t.confirmDelete}>
        Delete Torrent
      </button>
      <label>
        With all downloaded data &nbsp;
        <input type="checkbox" onChange={t.toggleDeleteData}/>
      </label>
    </div>
  ) : (
    <div>
      <h2>{ t.name }</h2>
      <div className="torrent-size">
        {t.totalBytes}
      </div>
    </div>
  )

  return (
    <div className="torrent">
      {header}
      <button className="icon-button" style={{ textAlign: 'center' }}
        disabled={t.toggle.disabled} onClick={t.toggle.click}>
        <i className="material-icons">{t.toggle.icon}</i>
      </button>
      <div className="progress">
        <div className="bar" style={t.progressBarStyle}></div>
      </div>
      <button className="icon-button" style={{ textAlign: 'right' }} onClick={t.toggleShowDelete}>
        <i className="material-icons" style={{color: t.showDelete ? 'lightcoral' : ''}}>
          { t.showDelete ? ICON_CANCEL : ICON_DELETE_TORRENT }
        </i>
      </button>
      <div className="details">
        <div className="stat">
          <i className="material-icons">{ICON_ETA}</i> { t.eta }
        </div>
        <div className="stat">
          <i className="material-icons">{ICON_RATIO}</i> { t.ratio }
        </div>
        <div className={ activeClass }>
          <div className="stat">
            <i className="material-icons">{ICON_PEERS}</i> { t.peers }
          </div>
          <div className="stat">
            <i className="material-icons">{ICON_DOWNLOAD}</i> { t.bpsDown }
          </div>
          <div className="stat">
            <i className="material-icons">{ICON_UPLOAD}</i> { t.bpsUp }
          </div>
        </div>
        <div className="stat label">
          <i className="material-icons" style={labelStyle}>{ICON_LABEL}</i>
          <select defaultValue={ t.label ? t.label.id : '' } 
            onChange={v => t.setLabel(v.target.value)} 
            style={{ maxWidth: t.label ? `${t.label.name.length}em` : '0.75em' }}>
              { 
                  t.label === null ? 
                    <option value="add-label"></option> : 
                    <option value="no-label">(remove label)</option>
              }
              { 
                t.allLabels.map(lbl => <option key={lbl.id} value={lbl.id}>{lbl.name}</option>)
              }
          </select>
        </div>
      </div>
    </div>
  )
}

export default Torrent
