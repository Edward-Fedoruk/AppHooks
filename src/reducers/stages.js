import * as types from "../actions/types"

const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case types.CREATE_STAGE_ERROR:
    return { ...state, ...payload }
  default:
    return state
  }
}
