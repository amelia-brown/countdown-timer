// actions
const SET_COUNTDOWN = 'countdown/SET_COUNTDOWN'
const CLEAR_COUNTDOWN = 'countdown/CLEAR_COUNTDOWN'

// action creators
export const clearCountdown = () => ({
  type: CLEAR_COUNTDOWN
})

export const setCountdown = (options) => ({
  type: SET_COUNTDOWN,
  payload: options
})

// initial state
const INITIAL_STATE = {
  hours: 0,
  minutes: 0,
  seconds: 0
}

// reducer
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_COUNTDOWN:
      return action.payload
    case CLEAR_COUNTDOWN:
      return INITIAL_STATE
    default:
      return state
  }
}

// selectors
export const getCountdown = state => state.countdown
