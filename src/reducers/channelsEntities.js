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

const filterEntities = (entity, filter) => Object.keys(entity)
  .filter(filter).reduce((result, current) => {
    result[current] = entity[current]
    return result
  }, {})

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
  case types.CREATE_STAGE_SUCCESS: {
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
  case types.REMOVE_STAGE_SUCCESS: {
    const { entities, entities: { stages, channels } } = state
    const { channelId, stageId } = action
    const filterStages = key => key !== stageId

    return {
      ...state,
      entities: {
        ...entities,
        channels: {
          [channelId]: {
            stages: channels[channelId].stages.filter(filterStages),
          },
        },
        stages: filterEntities(stages, filterStages),
      },
    }
  }
  case types.REMOVE_STAGES: {
    const { entities, channels, entities: { stages } } = state
    const { id } = action
    const filterStages = key => !channels[id].stages.includes(parseInt(key, 10))
    const newStages = filterEntities(stages, filterStages)
    return {
      ...state,
      entities: {
        ...entities,
        stages: newStages,
        channels: {
          ...channels,
          [id]: { ...channels[id], stages: Object.keys(newStages) },
        },
      },
    }
  }
  case types.REMOVE_CHANNEL: {
    const { channels, stages, endpoints } = state.entities

    const filterStages = key => !channels[action.id].stages.includes(parseInt(key, 10))
    const filterEndpoints = key => endpoints[key].application_id === action.id
    const filterChannels = key => key !== action.id

    return {
      ...state,
      entities: {
        ...state.entities,
        endpoints: filterEntities(endpoints, filterEndpoints),
        stages: filterEntities(stages, filterStages),
        channels: filterEntities(channels, filterChannels),
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
