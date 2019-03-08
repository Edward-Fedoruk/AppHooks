import * as types from "../actions/types"

const initialState = {
  error: false,
  errorMessage: "",
  currentChannel: {
    stageIds: [],
    channelId: "",
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.FETCH_CHANNELS_SUCCESS:
    return {
      ...state,
      error: false,
      errorMessage: 0,
    }
  case types.CREATE_CHANNEL_FAILURE:
    return { ...state, error: true }
  case types.SET_CURRENT_CHANNEL:
    return {
      ...state,
      currentChannel: action.channel,
    }
  case types.REMOVE_CHANNEL:
    return {
      ...state,
      currentChannel: {
        stageIds: [],
        channelId: "",
      },
    }
  default:
    return state
  }
}
