import { APP_INIT } from '../actions/app'
import { LABEL_UPDATE, LABEL_DELETE } from '../actions/labels'

export const initialState = []

const sortLabels = labels => {
  if (labels === null) {
    return initialState
  }
  labels.sort((a, b) => b.name < a.name)
  return labels
}

const labels = (state = initialState, action) => {
  switch (action.type) {
    case APP_INIT:
      return sortLabels(action.payload.labels)

    case LABEL_UPDATE: {
      let labels = [...state]
      let i = labels.findIndex(v => v.id === action.payload.id)
      if (i > -1) {
        labels[i] = action.payload
      } else {
        labels.push(action.payload)
        labels = sortLabels(labels)
      }
      return labels
    }

    case LABEL_DELETE: {
      let labels = [...state]
      let i = labels.findIndex(v => v.id === action.payload)
      if (i > -1) {
        labels.splice(i, 1)
      }
      return sortLabels(labels)
    }

    default:
      return state
  }
}

export default labels
