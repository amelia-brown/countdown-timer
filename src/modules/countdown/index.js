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
  countdown: {
    hours: 00,
    minutes: 00,
    seconds: 00
  }
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
export const getCountdown = state => state.countown
