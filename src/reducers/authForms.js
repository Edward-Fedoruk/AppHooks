import * as types from "../actions/types"

const initialState = {
  errors: {},
  isAuthenticated: false,
  error: false,

  resendError: false,
  resendErrorMessage: "",

  logInError: false,
  logInErrorMessage: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.AUTH_ERROR:
    return {
      ...state,
      ...action.error,
    }
  default:
    return state
  }
}
