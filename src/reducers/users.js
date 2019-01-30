import * as types from '../actions/types'

const initialState = {
  users: []
}

export default (state = initialState, action) => {
  switch (action.types) {
    case types.SET_USERS:
      return { 
        ...state, 
        users: action.users 
      }

    default:
      return state
  }
}
