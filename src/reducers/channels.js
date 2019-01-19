import  * as types from '../actions/types'

const initialState = {
  error: false,
  errorMessage: "",
  currentChannel: {
    stageIds: [],
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CHANNELS: 
      return {
        ...state,
        error: false,
        errorMessage: ""
      }
    case types.CREATE_CHANNEL_ERROR: 
      return {
        ...state,
        errorMessage: action.errorMessage,
        error: true
      }
    case types.SET_CURRENT_CHANNEL: 
      return {
        ...state,
        currentChannel: action.channel,
      }
    case types.REMOVE_CHANNEL:
      return {
        ...state,
        currentChannel: {}
      }
    default:
      return state
  }
}