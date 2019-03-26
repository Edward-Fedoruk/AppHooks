import { compose } from "redux"
import * as types from "./types"
import axios, {
  handleErrorResponse,
  createError,
  handleResponse,
  initiateLoading,
} from "./utils"
import { toggleCreateEndpointForm, toggleSnackbar, toggleSuccessSnackbar } from "./ui"
import history from "../history"

export const setEndpointInStore = endpoint => ({
  type: types.CREATE_ENDPOINT_SUCCESS,
  endpoint,
})

export const fetchEndpointToStore = endpoint => ({
  type: types.FETCH_ENDPOINT_SUCCESS,
  endpoint,
})

export const deleteEndpointFromStore = (stageId, endpointId) => ({
  type: types.DELETE_ENDPOINT_SUCCESS,
  stageId,
  endpointId,
})

export const changeEndpointInStore = endpoint => ({
  type: types.EDIT_ENDPOINT_SUCCESS,
  endpoint,
})

export const createEndpoint = (channelId, stageId, endpointData) => (dispatch) => {
  axios.post(`/apps/${channelId}/${stageId}/endpoints`, endpointData)
    .then((response) => {
      handleResponse(dispatch, setEndpointInStore)(response)
      dispatch(toggleCreateEndpointForm())
      dispatch(toggleSuccessSnackbar("Endpoint was created"))
    })
    .catch(compose(
      compose(dispatch, toggleSnackbar),
      handleErrorResponse(dispatch, createError("CREATE_ENDPOINT"))
    ))
}

export const deleteEndpoint = (channelId, stageId, endpointId) => (dispatch) => {
  console.log(`/apps/${channelId}/${stageId}/endpoints/${endpointId}`)
  axios.delete(`/apps/${channelId}/${stageId}/endpoints/${endpointId}`)
    .then(() => {
      dispatch(deleteEndpointFromStore(stageId, endpointId))
      dispatch(toggleSuccessSnackbar("Endpoint was deleted"))
      history.push({ pathname: `/channels/${channelId}/${stageId}` })
    })
    .catch(compose(
      compose(dispatch, toggleSnackbar),
      handleErrorResponse(dispatch, createError("DELETE_ENDPOINT"))
    ))
}

export const editEndpointName = (channelId, stageId, endpointId, endpointData) => (dispatch) => {
  axios.put(`/apps/${channelId}/${stageId}/endpoints/${endpointId}`, endpointData)
    .then((response) => {
      handleResponse(dispatch, changeEndpointInStore)(response)
      dispatch(toggleSuccessSnackbar("Endpoint name was edited"))
    })
    .catch(compose(
      compose(dispatch, toggleSnackbar),
      handleErrorResponse(dispatch, createError("CHANGE_ENDPOINT"))
    ))
}

export const fetchEndpoint = (channelId, stageId, endpointId) => (dispatch) => {
  dispatch(initiateLoading("FETCH_ENDPOINT"))
  axios.get(`/apps/${channelId}/${stageId}/endpoints/${endpointId}`)
    .then((response) => {
      handleResponse(dispatch, fetchEndpointToStore)(response)
    })
    .catch(compose(
      compose(dispatch, toggleSnackbar),
      handleErrorResponse(dispatch, createError("FETCH_ENDPOINT"))
    ))
}
