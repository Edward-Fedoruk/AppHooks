import * as types from '../actions/types'

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
    case types.SET_STAGES: 
      return {
        ...state,
        entities: {
          ...state.entities,
          ...action.payload.entities,
          stages: { ...state.entities.stages, ...action.payload.entities.stages }
        }
      }
    case types.REMOVE_CHANNEL:
      const channels = state.entities.channels
      const stagesIds = channels[action.channelId].stages
      const stages = state.entities.stages
      const endpoints = state.entities.endpoints
      const newEndpoints = Object.keys(endpoints)
        .filter(key => endpoints[key].application_id === action.channelId)
        .reduce((result, current) => {
          result[current] = endpoints[current]
          return result
        }, {})
      const newStages =  Object.keys(stages)
        .filter(key => !stagesIds.includes(parseInt(key)))
        .reduce((result, current) => {
          result[current] = stages[current]
          return result
        }, {})
      const newChannels = Object.keys(channels)
        .filter(key => key !== action.channelId)
        .reduce((result, current) => {
          result[current] = channels[current]
          return result
        }, {}) 

      console.log(newEndpoints, newStages, newChannels)
      return {
        ...state,
        entities: {
          ...state.entities,
          endpoints: newEndpoints,
          stages: newStages,
          channels: newChannels 
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
