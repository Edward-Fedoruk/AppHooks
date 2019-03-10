/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import * as types from "../actions/types"

const initialState = {
  entities: {
    stages: {},
    channels: {},
    endpoints: {},
  },
  result: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.FETCH_CHANNELS_SUCCESS:
    return {
      ...state,
      entities: {
        ...state.entities,
        ...action.payload.entities,
      },
      result: action.payload.result,
    }
  case types.SET_STAGES: {
    const { entities, entities: { channels, stages } } = state
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
            stages: [...channels[id].stages, payload.result],
          },
        },
      },
    }
  }
  case types.REMOVE_STAGES: {
    const { entities, channels, entities: { stages } } = state
    const { id } = action
    const stagesKeys = Object.keys(entities.stages)
      .filter(key => !channels[id].stages.includes(parseInt(key, 10)))
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
          [id]: { ...channels[id], stages: stagesKeys },
        },
      },
    }
  }
  case types.REMOVE_CHANNEL: {
    const { channels, stages, endpoints } = state.entities
    const stagesIds = channels[action.id].stages
    const newEndpoints = Object.keys(endpoints)
      .filter(key => endpoints[key].application_id === action.id)
      .reduce((result, current) => {
        result[current] = endpoints[current]
        return result
      }, {})
    const newStages = Object.keys(stages)
      .filter(key => !stagesIds.includes(parseInt(key, 10)))
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
        channels: newChannels,
      },
      result: {
        data: state.result.filter(id => id !== action.id),
      },
    }
  }
  case types.ADD_CHANNEL_SUCCESS: {
    const { entities, result } = state
    const { payload } = action
    const stages = payload.entities.channels[payload.result].stages === undefined
      ? [] : payload.entities.channels[payload.result].stages
    return {
      ...state,
      entities: {
        ...entities,
        stages: {
          ...payload.entities.stages,
          ...entities.stages,
        },
        channels: {
          ...entities.channels,
          [payload.result]: {
            ...payload.entities.channels[payload.result],
            stages: [...stages],
          },
        },
      },
      result: [...result, payload.result],
    }
  }
  default:
    return state
  }
}
