export const FILTER_SET = 'FILTER_SET '
export const FILTER_ALL = 'FILTER_ALL '
export const FILTER_ACTIVE = 'FILTER_ACTIVE '
export const FILTER_QUEUED = 'FILTER_QUEUED '
export const FILTER_STOPPED = 'FILTER_STOPPED '
export const FILTER_PENDING = 'FILTER_PENDING '
export const FILTER_SEEDING = 'FILTER_SEEDING '
export const FILTER_DONE = 'FILTER_DONE'

export const setVisibilityFilter = filter => {
  return {
    type: FILTER_SET,
    filter
  }
}
