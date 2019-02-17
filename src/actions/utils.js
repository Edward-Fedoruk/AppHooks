/* eslint-disable no-param-reassign */
import axios from "axios"
import { compose } from "redux"
import * as types from "./types"

export const domain = "https://app.develop.apphooks.io"

export const initiateLoading = loadType => ({
  type: types[`${loadType}_REQUEST`],
})

export const createError = loadType => error => ({
  type: types[`${loadType}_FAILURE`],
  error,
})

export const createLoadingSelector = actions => state => actions.some(action => state[action])

export const createErrorMessageSelector = actions => (state) => {
  const errors = actions.map(action => state[action])
  return errors && errors[0] ? errors[0] : ""
}

const destruct = ({ data: { data } }) => data
export const handleResponse = (dispatch, action) => compose(
  compose(dispatch, action),
  destruct
)

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
