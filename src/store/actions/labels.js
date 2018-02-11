export const LABEL_UPDATE = 'LABEL_UPDATE'
export const LABEL_DELETE = 'LABEL_DELETE'

export const updateLabel = label => {
  return {
    type: LABEL_UPDATE,
    payload: label
  }
}

export const deleteLabel = id => {
  return {
    type: LABEL_DELETE,
    payload: id
  }
}
