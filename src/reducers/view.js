import  * as types from '../actions/types'

const initialState = {
  open: false,
  snackbar: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NAV_BAR:
      return { ...state, open: !state.open}
    case types.TOGGLE_SNACKBAR: 
      return { ...state, snackbar: !state.snackbar }
    default:
      return state
  }
}
