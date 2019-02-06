import * as types from "../actions/types"

const initialState = {
  settings: {
    name: "",
    company: "",
    phone: ""
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case types.SET_USER_SETTINGS:
      return { 
        ...state,
        settings: action.data  
      }
    case types.GENERAL_INFO_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
    }
}
