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
    const filterStages = key => `${key}` !== `${stageId}`
    return {
      ...state,
      entities: {
        ...entities,
        channels: {
          [channelId]: {
            ...state.entities.channels[channelId],
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
  case types.EDIT_STAGE_NAME_SUCCESS: {
    const { entities, entities: { stages } } = state
    const { newStageData: { id: stageId, name, slug } } = action
    return {
      ...state,
      entities: {
        ...entities,
        stages: {
          ...stages,
          [stageId]: {
            ...stages[stageId],
            name,
            slug,
          },
        },
      },
    }
  }
  case types.EDIT_ENDPOINT_SUCCESS: {
    const { entities, entities: { endpoints } } = state
    const { endpoint } = action
    return {
      ...state,
      entities: {
        ...entities,
        endpoints: {
          ...endpoints,
          [endpoint.id]: { ...endpoint },
        },
      },
    }
  }
  case types.REMOVE_CHANNEL_SUCCESS: {
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
  case types.ADD_COLLABORATOR_SUCCESS: {
    const { channelId, user } = action
    const { entities, entities: { channels } } = state

    return {
      ...state,
      entities: {
        ...entities,
        channels: {
          ...channels,
          [channelId]: {
            ...channels[channelId],
            collaborators: channels[channelId].collaborators.concat([user]),
          },
        },
      },
    }
  }
  case types.DELETE_COLLABORATOR_SUCCESS: {
    const { channelId, userId } = action
    const { entities, entities: { channels } } = state

    return {
      ...state,
      entities: {
        ...entities,
        channels: {
          ...channels,
          [channelId]: {
            ...channels[channelId],
            collaborators: channels[channelId].collaborators.filter(user => user.id !== userId),
          },
        },
      },
    }
  }
  case types.ADD_CHANNEL_SUCCESS: {
    const { entities, result } = state
    const { payload, payload: { entities: { endpoints, channels } } } = action
    const stages = channels[payload.result].stages === undefined
      ? [] : channels[payload.result].stages
    return {
      ...state,
      entities: {
        ...entities,
        endpoints: { ...entities.endpoints, ...endpoints },
        stages: { ...payload.entities.stages, ...entities.stages },
        channels: {
          ...entities.channels,
          [payload.result]: {
            ...channels[payload.result],
            stages: [...stages],
          },
        },
      },
      result: result.includes(payload.result) ? result : [...result, payload.result],
    }
  }
  case types.CREATE_ENDPOINT_SUCCESS: {
    const { entities, entities: { endpoints, stages } } = state
    const { endpoint, endpoint: { application_stage_id: stageId } } = action
    return {
      ...state,
      entities: {
        ...entities,
        endpoints: {
          ...endpoints,
          [endpoint.id]: { ...endpoint },
        },
        stages: {
          ...stages,
          [stageId]: {
            ...stages[stageId],
            endpoints: stages[stageId].endpoints.concat([endpoint.id]),
          },
        },
      },
    }
  }
  case types.FETCH_ENDPOINT_SUCCESS: {
    const { entities, entities: { endpoints } } = state
    const { endpoint } = action
    return {
      ...state,
      entities: {
        ...entities,
        endpoints: {
          ...endpoints,
          [endpoint.id]: { ...endpoint },
        },
      },
    }
  }
  case types.DELETE_ENDPOINT_SUCCESS: {
    const { entities, entities: { endpoints, stages } } = state
    const { stageId, endpointId } = action
    const filterEndpoint = endpoint => endpoint !== endpointId

    return {
      ...state,
      entities: {
        ...entities,
        endpoints: {
          ...endpoints,
          [endpointId]: filterEntities(endpoints, filterEndpoint),
        },
        stages: {
          ...stages,
          [stageId]: {
            ...stages[stageId],
            endpoints: stages[stageId].endpoints.filter(filterEndpoint),
          },
        },
      },
    }
  }
  default:
    return state
  }
}
