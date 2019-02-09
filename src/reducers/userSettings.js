import * as types from "../actions/types"

const initialState = {
  settings: {
    name: "",
    company: "",
    phone: "",
    package: ""
  },
  error: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case types.SET_USER_SETTINGS:
      return { 
        ...state,
        settings: action.data  
      }
    case types.SETTINGS_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
    }
}
