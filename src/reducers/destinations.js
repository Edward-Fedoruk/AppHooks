import * as types from "../actions/types"

const initialState = {
  allDestinations: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.CREATE_DESTINATION_SUCCESS:
    return {
      ...state,
      allDestinations: [...state.allDestinations, action.destination],
    }
  default:
    return state
  }
}
