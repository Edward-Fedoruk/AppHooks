import * as types from "../actions/types"

const initialState = {
  users: [],
  currentUser: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SET_USERS_SUCCESS:
    return {
      ...state,
      users: action.users,
    }
  case types.SET_USER:
    return {
      ...state,
      currentUser: action.user,
    }
  case types.ADD_USER:
    return {
      ...state,
      users: [...state.users, action.user],
    }
  case types.DELETE_USER:
    return {
      ...state,
      users: state.users.filter(({ id }) => id !== action.id),
    }
  case types.CHANGE_USER_PRIVILEGES:
    return {
      ...state,
      users: state.users.map(user => (user.id === action.userData.id ? action.userData : user)),
    }
  default:
    return state
  }
}
