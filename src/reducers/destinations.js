import * as types from "../actions/types"

const initialState = {
  allDestinations: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.CREATE_DESTINATION_SUCCESS:
    return {
      ...state,
      allDestinations: state.allDestinations.concat([action.destination]),
    }
  case types.DELETE_DESTINATION_SUCCESS:
    return {
      ...state,
      allDestinations: state.allDestinations.filter(dest => dest.id !== action.id),
    }
  case types.FETCH_DESTINATIONS_SUCCESS:
    return {
      ...state,
      allDestinations: action.destinations,
    }
  case types.EDIT_DESTINATION_SUCCESS:
    return {
      ...state,
      allDestinations: state.allDestinations.map(dest => (
        dest.id === action.destination.id
          ? action.destination : dest
      )),
    }
  default:
    return state
  }
}
