import * as types from "../actions/types"

const initialState = {
  settings: {
    name: "",
    company: "",
    phone: "",
    package: "",
  },
  error: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SET_USER_SETTINGS_FAILURE:
    return { ...state, isAuthenticated: false }
  case types.SET_USER_SETTINGS_SUCCESS:
    return {
      ...state,
      settings: action.data,
      isAuthenticated: true,
    }
  case types.SETTINGS_ERROR:
    return {
      ...state,
      error: action.error,
    }
  default:
    return state
  }
}
