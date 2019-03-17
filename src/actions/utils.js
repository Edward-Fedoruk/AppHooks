/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import axios from "axios"
import { compose } from "redux"
import * as types from "./types"
import history from "../history"

export const domain = "https://app.develop.apphooks.io"

// action creators
export const initiateLoading = loadType => ({
  type: types[`${loadType}_REQUEST`],
})

export const createError = loadType => error => ({
  type: types[`${loadType}_FAILURE`],
  error,
})

// store selectors
export const createLoadingSelector = actions => state => actions.some(action => state[action])

export const createErrorMessageSelector = actions => (state) => {
  const errors = actions.map(action => state[action])
  return errors && errors[0] ? errors[0] : ""
}


const destructData = ({ data }) => (data === undefined ? { data: {} } : data.data)
const destructError = ({ response }) => (response === undefined ? { data: {} } : response.data)
const createResponseHandler = destruct => (dispatch, action) => compose(
  compose(dispatch, action),
  destruct
)
export const handleResponse = createResponseHandler(destructData)
export const handleErrorResponse = createResponseHandler(destructError)


export const setFetchSettings = (method, accessToken, body) => ({
  method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  body,
})


export const getLocalStorageItem = (key) => {
  try {
    return localStorage.getItem(key)
  } catch { return undefined }
}

const instance = axios.create({
  baseURL: domain,
  transformRequest: [(data, headers) => {
    headers.Authorization = `Bearer ${getLocalStorageItem("JWT")}`
    return JSON.stringify(data)
  }],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

instance.interceptors.response.use(response => response,
  (error) => {
    const { response: { status } } = error
    if (status === 401) {
      console.log("failed at ", `${new Date().getHours()}:${new Date().getMinutes()}`)
      history.push("/login")
    }
    return Promise.reject(error)
  })

export default instance
