import  * as types from '../actions/types'

const initialState = {
  errors: {},
  isAuthenticated: false,
  error: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.CREATE_USER:
      return { 
        ...state,
        ...action.payload
      }
    case types.AUTH_ERROR:
      return {
        ...state,
        ...action.error
      }
    default:
      return state
  }
}