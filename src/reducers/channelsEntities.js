import * as types from '../actions/types'

const initialState = {
  entities: {
    stages: {},
    channels: {},
    endpoints: {}
  },
  result: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CHANNELS:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...action.payload.entities,
        },
        result: action.payload.result
      }
    case types.SET_STAGES: {
      const { entities, entities: {channels, stages} } = state
      const { id, payload } = action
      return {
        ...state,
        entities: {
          ...entities,
          stages: { ...stages, ...payload.entities.stages },
          channels: { 
            ...channels, 
            [id]: { 
              ...channels[id],  
              stages: [...channels[id].stages, payload.result]
            } 
          }
        }
      }
    }
    case types.REMOVE_STAGES: {
      const { entities, channels } = state
      const { id } = action
      const stagesKeys = Object.keys(entities.stages)
        .filter(key => !channels[id].stages.includes(parseInt(key)))
      return {
        ...state,
        entities: {
          ...entities,
          stages: stagesKeys.reduce((result, current) => {
            result[current] = stages[current]
            return result
          }, {}),
          channels: {
            ...channels,
            [id]: { ...channels[id], stages: stagesKeys }
          } 
        }
      }
    }
    case types.REMOVE_CHANNEL:
      const channels = state.entities.channels
      const stagesIds = channels[action.id].stages
      const stages = state.entities.stages
      const endpoints = state.entities.endpoints
      console.log("entities", state.entities)
      const newEndpoints = Object.keys(endpoints)
        .filter(key => endpoints[key].application_id === action.id)
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
        .filter(key => key !== action.id)
        .reduce((result, current) => {
          result[current] = channels[current]
          return result
        }, {}) 

      return {
        ...state,
        entities: {
          ...state.entities,
          endpoints: newEndpoints,
          stages: newStages,
          channels: newChannels 
        },
        result:{
          data: state.result.filter((id) => id !== action.id),
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
        result: [...result, action.payload.result] 
      }

    default:
      return state
  }
}