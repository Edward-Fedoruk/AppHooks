import { normalize } from "normalizr"
import { compose } from "redux"
import * as types from "./types"
import { createStage } from "./stage"
import { channelSchema } from "./schemas"
import axios, { handleErrorResponse, createError, initiateLoading } from "./utils"
import { toggleCreateChannelForm, toggleSnackbar, toggleSuccessSnackbar } from "./ui"
import history from "../history"

export const setChannelsData = payload => ({
  type: types.FETCH_CHANNELS_SUCCESS,
  payload,
})

export const throwChannelCreationError = errorMessage => ({
  type: types.CREATE_CHANNEL_FAILURE,
  errorMessage,
})

export const addChannel = payload => ({
  type: types.ADD_CHANNEL_SUCCESS,
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

export const createChannel = channelData => (dispatch) => {
  axios.post("/apps", channelData)
    .then(({ data: { data } }) => {
      const stageData = { name: `${data.name.trim()}-default` }
      const normalizedData = normalize(data, channelSchema)

      dispatch(addChannel(normalizedData))
      dispatch(createStage(data.id, stageData))
      dispatch(toggleSuccessSnackbar("Channel was created"))
      dispatch(toggleCreateChannelForm())
    })
    .catch(compose(
      compose(dispatch, toggleSnackbar),
      handleErrorResponse(dispatch, createError("CREATE_CHANNEL"))
    ))
}

export const fetchChannels = routeHistory => (dispatch) => {
  dispatch(initiateLoading("FETCH_CHANNELS"))

  axios.get("/apps")
    .then(({ data: { data } }) => {
      const normalizedData = normalize(data, [channelSchema])
      dispatch(setChannelsData(normalizedData))
    })
    .catch(() => routeHistory.push({ pathname: "/login" }))
}

export const fetchChannel = id => (dispatch) => {
  axios.get(`/apps/${id}`)
    .then(({ data: { data } }) => {
      const normalizedData = normalize(data, channelSchema)

      dispatch(addChannel(normalizedData))
      compose(dispatch, setCurrentChannel)({
        channelId: id,
        stageIds: normalizedData.entities.channels[id].stages,
      })
    })
    .catch(() => history.push({ pathname: "/login" }))
}

export const deleteChannel = id => (dispatch) => {
  axios.delete(`/apps/${id}`)
    .then(() => {
      dispatch(removeChannelFromStore(id))
      history.push("/channels")
    })
    .catch(() => history.push({ pathname: "/login" }))
}
