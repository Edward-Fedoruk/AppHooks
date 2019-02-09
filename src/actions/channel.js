import { normalize } from "normalizr"
import { compose } from "redux"
import * as types from "./types"
import { createStage } from "./stage"
import { channelSchema } from "./schemas"
import { domain, setFetchSettings } from "./utils"

export const setChannelsData = payload => ({
  type: types.SET_CHANNELS,
  payload,
})

export const throwChannelCreationError = errorMessage => ({
  type: types.CREATE_CHANNEL_ERROR,
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
  const accessToken = localStorage.getItem("JWT")

  if (accessToken === null) {
    routeHistory.push({
      pathname: "/login",
    })

    return
  }

  const stringifiedData = JSON.stringify(channelData)
  const settings = setFetchSettings("POST", accessToken, stringifiedData)

  fetch(`${domain}/apps`, settings)
    .then(response => response.json()
      .then((json) => {
        if (response.ok) {
          return Promise.resolve(json)
        }
        return Promise.reject(json)
      }))
    .then(({ data }) => {
      const stageData = { name: `${data.name.trim()}-default` }

      compose(
        dispatch,
        addChannel
      )(normalize(data, channelSchema))

      dispatch(createStage(data.id, stageData, routeHistory))
    })
    .catch((er) => {
      console.log(er)
      dispatch(throwChannelCreationError(er.message))
    })
}

export const fetchChannels = routeHistory => (dispatch) => {
  const accessToken = localStorage.getItem("JWT")

  if (accessToken === null) {
    routeHistory.push({
      pathname: "/login",
    })
    return
  }

  const settings = setFetchSettings("GET", accessToken, null)

  fetch(`${domain}/apps`, settings)
    .then(response => response.json()
      .then((json) => {
        if (response.ok) {
          return Promise.resolve(json)
        }
        return Promise.reject(json)
      }))
    .then(data => compose(
      dispatch,
      setChannelsData,
    )(normalize(data.data, [channelSchema])))
    .catch((er) => {
      console.log(er)
      routeHistory.push({
        pathname: "/login",
      })
    })
}

export const fetchChannel = (id, routeHistory) => (dispatch) => {
  const accessToken = localStorage.getItem("JWT")

  const settings = setFetchSettings("GET", accessToken, null)

  fetch(`${domain}/apps/${id}`, settings)
    .then(response => response.json()
      .then((json) => {
        if (response.ok) {
          return Promise.resolve(json)
        }
        return Promise.reject(json)
      }))
    .then(({ data }) => {
      console.log(data)
      const normalizedData = normalize(data, channelSchema)

      compose(
        dispatch,
        addChannel,
      )(normalizedData)

      compose(dispatch, setCurrentChannel)({
        channelId: id,
        stageIds: normalizedData.entities.channels[id].stages,
      })
    })
    .catch((er) => {
      console.log(er)
      routeHistory.push({
        pathname: "/login",
      })
    })
}

export const deleteChannel = (id, routeHistory) => (dispatch) => {
  const accessToken = localStorage.getItem("JWT")

  const settings = setFetchSettings("DELETE", accessToken, null)

  fetch(`${domain}/apps/${id}`, settings)
    .then((response) => {
      if (response.ok) {
        return Promise.resolve(response)
      }
      return Promise.reject(response)
    })
    .then((data) => {
      console.log(data)
      dispatch(removeChannelFromStore(id))
      routeHistory.push("/channels")
    })
    .catch((er) => {
      console.log(er)
      routeHistory.push({
        pathname: "/login",
      })
    })
}
