import * as types from "../actions/types"

const initialState = {
  requests: [],
  openedLog: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

  case types.SET_LOGS:
    return { 
      ...state, 
      requests: [...action.logs] 
    }

  case types.DELETE_LOGS:
    return {
      ...state,
      requests: state.requests.filter(({ id }) => !action.ids.includes(id))
    }
  case types.SET_LOG: 
    return {
      ...state,
      openedLog: action.log
    }
  default:
    return state
  }
}
