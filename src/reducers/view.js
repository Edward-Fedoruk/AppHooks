import  * as types from '../actions/types'

const initialState = {
  open: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NAV_BAR:
      return { ...state, open: !state.open}

    default:
      return state
  }
}
