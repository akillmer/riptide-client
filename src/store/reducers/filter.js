import { FILTER_ALL, FILTER_SET } from '../actions/filter'

export const initialState = FILTER_ALL

export const filter = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_SET:
      return action.filter
    default:
      return state
  }
}

export default filter
