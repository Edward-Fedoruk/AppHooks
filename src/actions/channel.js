import * as types from "./types"
import { compose } from 'redux'
import { createStage } from './stage'
import { normalize } from 'normalizr'
import { channelSchema } from './schemas'

const setFetchSettings = (method, accessToken, body) => ({
  method,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + accessToken
  },
  body
})

export const setChannelsData = payload => ({
  type: types.SET_CHANNELS,
  payload
})

export const throwChannelCreationError = errorMessage => ({
  type: types.CREATE_CHANNEL_ERROR,
  errorMessage
})

export const addChannel = (payload) => ({
  type: types.ADD_CHANNEL,
  payload
})

export const setCurrentChannel = (channel) => ({
  type: types.SET_CURRENT_CHANNEL,
  channel
})

export const removeChannelFromStore = (id) => ({
  type: types.REMOVE_CHANNEL,
  id
}) 

export const createChannel = (channelData, routeHistory) => dispatch => { 
  const accessToken = localStorage.getItem("JWT")

  if(accessToken === null) {
    routeHistory.push({
      pathname: "/login"
    })
    
    return
  }

  const stringifiedData = JSON.stringify(channelData)
  const settings = setFetchSettings("POST", accessToken, stringifiedData)

  fetch("http://app.develop.apphooks.io/apps", settings)
    .then((response) => {
      return response.json()
      .then((json) => {
        if (response.ok) {
          return Promise.resolve(json)
        }
        return Promise.reject(json)
      })
    })
    .then(({ data }) => {
      console.log(data)
      dispatch(addChannel(normalize(data, channelSchema)))
      const stageData = { name: `${data.name.trim()}-default` }
      dispatch(createStage(data.id, stageData, routeHistory))
    })
    .catch(er =>{
      console.log(er)
      dispatch(throwChannelCreationError(er.message))
    })
} 

export const fetchChannels = routeHistory => dispatch => {
  const accessToken = localStorage.getItem("JWT")

  if(accessToken === null) {
    routeHistory.push({
      pathname: "/login"
    })
    return
  }

  const settings = setFetchSettings("GET", accessToken, null)

  fetch("http://app.develop.apphooks.io/apps", settings)
    .then((response) => {
      return response.json()
      .then((json) => {
        if (response.ok) {
          return Promise.resolve(json)
        }
        return Promise.reject(json)
      })
    })
    .then(data => {
      dispatch(setChannelsData(normalize(data.data, [channelSchema])))
    })
    .catch(er =>{
      console.log(er)
      routeHistory.push({
        pathname: "/login"
      })
    })
}

export const fetchChannel = (id, routeHistory) => dispatch => {
  const accessToken = localStorage.getItem("JWT")

  const settings = setFetchSettings("GET", accessToken, null)

  fetch(`http://app.develop.apphooks.io/apps/${id}`, settings)
    .then((response) => {
      return response.json()
      .then((json) => {
        if (response.ok) {
          return Promise.resolve(json)
        }
        return Promise.reject(json)
      })
    })
    .then(data => {
      console.log(data)
      dispatch(setCurrentChannel(data))
    })
    .catch(er =>{
      console.log(er)
      routeHistory.push({
        pathname: "/login"
      })
    })
}

export const deleteChannel = (id, routeHistory) => dispatch => {
  const accessToken = localStorage.getItem("JWT")

  const settings = setFetchSettings("DELETE", accessToken, null)
  
  fetch(`http://app.develop.apphooks.io/apps/${id}`, settings)
    .then((response) => {
      if (response.ok) {
        return Promise.resolve(response)
      }
      return Promise.reject(response)
    })
    .then(data => {
      console.log(data)
      dispatch(removeChannelFromStore(id))
      
      routeHistory.push("/channels")
    })
    .catch(er =>{
      console.log(er)
      routeHistory.push({
        pathname: "/login"
      })
    })
}