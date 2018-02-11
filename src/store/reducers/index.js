import { combineReducers } from 'redux'
import torrents, { initialState as torrentState } from './torrents'
import labels, { initialState as labelState } from './labels'
import filter, { initialState as filterState } from './filter'

export const initialState = {
  torrents: torrentState,
  labels: labelState,
  filter: filterState
}

export default combineReducers({
  torrents,
  labels,
  filter
})
