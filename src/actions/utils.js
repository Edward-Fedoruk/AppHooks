/* eslint-disable no-param-reassign */
import axios from "axios"
import * as types from "./types"

export const domain = "https://app.develop.apphooks.io"

export const initiateLoading = loadType => ({
  type: types[`${loadType}_REQUEST`],
})

export const throwError = (loadType, error) => ({
  type: types[`${loadType}_FAILURE`],
  error,
})

export const createLoadingSelector = actions => state => actions.some(action => state[action])

export const setFetchSettings = (method, accessToken, body) => ({
  method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  body,
})

export default axios.create({
  baseURL: domain,
  transformRequest: [(data, headers) => {
    headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`
    return JSON.stringify(data)
  }],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})
