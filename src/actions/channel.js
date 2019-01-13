import * as types from "./types"
import { compose } from 'redux'

export const setChannelsData = channels => ({
  type: types.SET_CHANNELS,
  channels
})

export const throwChannelCreationError = errorMessage => ({
  type: types.CREATE_CHANNEL_ERROR,
  errorMessage
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

  fetch("http://app.develop.apphooks.io/apps", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + accessToken
    },
    body: stringifiedData
  })
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
    dispatch(setChannelsData(data))
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

  fetch("http://app.develop.apphooks.io/apps", {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + accessToken
    },
  })
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
    
    dispatch(setChannelsData(JSON.parse(data)))
  })
  .catch(er =>{
    console.log(er)
    // routeHistory.push({
    //   pathname: "/login"
    // })
  })
}

export const setCurrentChannel = (channel) => ({
  type: types.SET_CURRENT_CHANNEL,
  channel
})

export const fetchChannel = (id, routeHistory) => dispatch => {
  const accessToken = localStorage.getItem("JWT")

  fetch(`http://app.develop.apphooks.io/apps/${id}`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + accessToken
    },
  })
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
    // routeHistory.push({
    //   pathname: "/login"
    // })
  })
}