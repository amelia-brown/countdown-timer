const SET_TIME = 'timefield/SET_TIME'
const VALIDATE = 'timefield/VALIDATE'

export const setTime = (options) => ({
  type: SET_TIME,
  payload: options
})

export const validate = () => ({
  type: VALIDATE
})

export default (state, action) => {
  switch (action.type) {
    case SET_TIME:
      return
    case VALIDATE:
    default:
      return state
  }
}

// shape = {
//    startTime: {
//      parts: {
//        hr / min / sec
//      }
//      isValid: bool
//    }
//    endTime: {
//      parts: {
//        hr / min / sec
//      }
//      isValid: bool
//    }
// }
