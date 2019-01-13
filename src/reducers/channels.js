import  * as types from '../actions/types'

const initialState = {
  channels: [],
  error: false,
  errorMessage: "",
  currentChannel: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CHANNELS: 
      return {
        ...state,
        channels: state.channels.concat(action.channels.data).sort((a, b) => {
          const currRegion = a.region.toUpperCase()
          const nextRegion = b.region.toUpperCase() 
          if (currRegion < nextRegion) return -1
          if (currRegion > nextRegion) return 1
          else return 0
        }),
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
        currentChannel: action.channel.data,
      }
    case types.REMOVE_CHANNEL:
      return {
        ...state,
        channels: state.channels.filter(({ id }) => id === action.channelId),
        currentChannel: {}
      }
    default:
      return state
  }
}