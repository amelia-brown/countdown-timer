// actions
const SET_TIME = 'timefield/SET_TIME'
const CLEAR_TIME = 'timefield/CLEAR_TIME'

// action creators
export const clearTime = () => ({
  type: CLEAR_TIME
})

export const setTime = (options) => ({
  type: SET_TIME,
  payload: options
})

// initial state
const INITIAL_STATE = {
  startTime: {},
  endTime: {}
}

// reducer
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TIME:
      return action.payload
    case CLEAR_TIME:
      return INITIAL_STATE
    default:
      return state
  }
}

// selectors
export const getStartTime = state => state.startTime
export const getEndTime = state => state.endTime
