import * as types from "../actions/types"

const initialState = {
  users: [],
  currentUser: {},
  inviteError: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERS:
      return { 
        ...state, 
        users: action.users 
      }
    case types.SET_USER:
      return { 
        ...state, 
        currentUser: action.user 
      }
    case types.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user]
      }
    case types.INVITE_ERROR: 
      return {
        ...state,
        inviteError: action.err
      }
    case types.DELETE_USER: 
      return {
        ...state,
        users: state.users.filter(({ id }) => id !== action.id)
      }
    default:
      return state
  }
}
