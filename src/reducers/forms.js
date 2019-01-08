import  * as types from '../actions/types'

const initialState = {
  errors: {},
  isAuthenticated: false,
  error: false
}

export const authentication = (state = initialState, action) => {
  if(action.type === types.CREATE_USER ) {
    return { 
      ...state,
      ...action.payload
    }
  }
  else if(action.type === types.AUTH_ERROR) {
    return {
      ...state,
      ...action.error
    }
  }
  else {
    return state
  }
}