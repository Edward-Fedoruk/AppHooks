import * as types from '../actions/types'
import { stat } from 'fs';

const initialState = {
  entities: {
    stages: {},
    channels: {}
  },
  result: []
}

export default (state = initialState, action) => {
  switch (action.type) {

  case types.SET_CHANNELS:
    return {
      ...state,
      entities: action.channels.entities,
      result: action.channels.result
    }
  case types.REMOVE_CHANNEL:
    const channels = state.entities.channels
    return {
      ...state,
      entities: {
        ...state.entities,
        channels: Object.keys(channels)
          .filter(key => key !== action.channelId)
          .reduce((result, current) => {
            result[current] = channels[current]
            return result
          }, {})
      },
      result:{
        data: state.result.filter((id) => id !== action.channelId),
      } 
    }
  case types.ADD_CHANNEL:
    const { entities, result } = state
    return {
      ...state,
      entities: {
        ...entities,
        ...action.payload.entities,
        channels: { ...entities.channels, ...action.payload.entities.channels }
      },
      result: { data: [...result, action.payload.result] }
    }

  default:
    return state
  }
}
