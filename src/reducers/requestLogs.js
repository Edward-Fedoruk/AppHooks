import * as types from "../actions/types"

const initialState = {
  requests: [],
  searchText: "",
  openedLog: {
    endpoint: {},
    destination: {},
    request: {
      headers: {},
    },
    response: {
      headers: {},
    },
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SET_LOGS_SUCCESS:
    return {
      ...state,
      requests: [...action.logs],
    }
  case types.LOGS_SEARCH_TEXT:
    return {
      ...state,
      searchText: action.searchText.trim(),
    }
  case types.DELETE_LOGS:
    return {
      ...state,
      requests: state.requests.filter(({ id }) => !action.ids.includes(id)),
    }
  case types.SET_LOG:
    return {
      ...state,
      openedLog: action.log,
    }
  default:
    return state
  }
}
