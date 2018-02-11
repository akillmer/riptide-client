import React from 'react'
import * as STATUS from '../../torrent-status'
import { FILTER_ALL, FILTER_DONE, FILTER_ACTIVE, FILTER_QUEUED,
  FILTER_SEEDING, FILTER_STOPPED } from '../../store/actions/filter'
import './style.css'

const FilterPanel = props => (
  <div id="filter-panel" className="side-panel">
   <h2>ALL TORRENTS</h2>
    <ul>
      <li onClick={() => props.setFilter(FILTER_ALL)}>
        <div className="badge">{ props.totalTorrents }</div>
        All Torrents
      </li>
      <li onClick={() => props.setFilter(FILTER_DONE)}>
        <div className="badge">{ props.counts[STATUS.DONE] }</div>
        Completed
      </li>
      <li onClick={() => props.setFilter(FILTER_ACTIVE)}>
        <div className="badge">{ props.counts[STATUS.ACTIVE] }</div>
        Downloading
      </li>
      <li onClick={() => props.setFilter(FILTER_QUEUED)}>
        <div className="badge">{ props.counts[STATUS.QUEUED] }</div>
        Queued
      </li>
      <li onClick={() => props.setFilter(FILTER_SEEDING)}>
        <div className="badge">{ props.counts[STATUS.SEEDING] }</div>
        Seeding
      </li>
      <li onClick={() => props.setFilter(FILTER_STOPPED)}>
        <div className="badge">{ props.counts[STATUS.STOPPED] }</div>
        Stopped
      </li>
    </ul>

    <h2>ACTIVE LABELS</h2>
    <ul>
      { props.labels.map(lbl => (
          <li key={lbl.id} onClick={() => props.setFilter(lbl.id)}>
            <div className="badge" style={{backgroundColor: lbl.color}}>{ props.counts[lbl.id] }</div>
            { lbl.name }
          </li>
        )
      )}
    </ul>
  </div>
)

export default FilterPanel
