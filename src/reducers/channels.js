import  * as types from '../actions/types'

const initialState = {
  channels: [],
  error: false,
  errorMessage: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CHANNELS: 
      console.log(action.channels)
      return {
        ...state,
        channels: state.channels.concat(action.channels).sort((a, b) => {
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
    default:
      return state
  }
}