import { normalize } from "normalizr"
import { compose } from "redux"
import * as types from "./types"
import { createStage } from "./stage"
import { channelSchema } from "./schemas"
import axios, { handleErrorResponse, createError } from "./utils"
import { toggleCreateChannelForm } from "./ui"

export const setChannelsData = payload => ({
  type: types.SET_CHANNELS,
  payload,
})

export const throwChannelCreationError = errorMessage => ({
  type: types.CREATE_CHANNEL_FAILURE,
  errorMessage,
})

export const addChannel = payload => ({
  type: types.ADD_CHANNEL,
  payload,
})

export const setCurrentChannel = channel => ({
  type: types.SET_CURRENT_CHANNEL,
  channel,
})

export const removeChannelFromStore = id => ({
  type: types.REMOVE_CHANNEL,
  id,
})

export const createChannel = (channelData, routeHistory) => (dispatch) => {
  axios.post("/apps", channelData)
    .then(({ data: { data } }) => {
      const stageData = { name: `${data.name.trim()}-default` }
      const normalizedData = normalize(data, channelSchema)

      dispatch(addChannel(normalizedData))
      dispatch(createStage(data.id, stageData, routeHistory))
      dispatch(toggleCreateChannelForm())
    })
    .catch(handleErrorResponse(dispatch, createError("CHANNEL_CREATE")))
}

export const fetchChannels = routeHistory => (dispatch) => {
  axios.get("/apps")
    .then(({ data: { data } }) => {
      const normalizedData = normalize(data, [channelSchema])
      dispatch(setChannelsData(normalizedData))
    })
    .catch(() => routeHistory.push({ pathname: "/login" }))
}

export const fetchChannel = (id, routeHistory) => (dispatch) => {
  axios.get(`/apps/${id}`)
    .then(({ data: { data } }) => {
      const normalizedData = normalize(data, channelSchema)

      dispatch(addChannel(normalizedData))
      compose(dispatch, setCurrentChannel)({
        channelId: id,
        stageIds: normalizedData.entities.channels[id].stages,
      })
    })
    .catch(() => routeHistory.push({ pathname: "/login" }))
}

export const deleteChannel = (id, routeHistory) => (dispatch) => {
  axios.delete(`/apps/${id}`)
    .then(() => {
      dispatch(removeChannelFromStore(id))
      routeHistory.push("/channels")
    })
    .catch(() => routeHistory.push({ pathname: "/login" }))
}
