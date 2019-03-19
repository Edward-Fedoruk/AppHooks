import { compose } from "redux"
import * as types from "./types"
import axios, {
  handleErrorResponse,
  createError,
  handleResponse,
} from "./utils"
import { toggleCreateEndpointForm, toggleSnackbar, toggleSuccessSnackbar } from "./ui"


export const setEndpointInStore = endpoint => ({
  type: types.CREATE_ENDPOINT_SUCCESS,
  endpoint,
})

export const deleteEndpointFromStore = endpoint => ({
  type: types.DELETE_ENDPOINT_SUCCESS,
  endpoint,
})

export const changeEndpointFromStore = endpoint => ({
  type: types.CHANGE_ENDPOINT_SUCCESS,
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
  axios.delete(`/apps/${channelId}/${stageId}/endpoints/${endpointId}`)
    .then(() => {
      dispatch(deleteEndpointFromStore())
      dispatch(toggleSuccessSnackbar("Endpoint was deleted"))
    })
    .catch(compose(
      compose(dispatch, toggleSnackbar),
      handleErrorResponse(dispatch, createError("DELETE_ENDPOINT"))
    ))
}

export const editEndpointName = (channelId, stageId, endpointId, endpointData) => (dispatch) => {
  axios.put(`/apps/${channelId}/${stageId}/endpoints/${endpointId}`, endpointData)
    .then(() => {
      dispatch(changeEndpointFromStore())
      dispatch(toggleSuccessSnackbar("Endpoint was deleted"))
    })
    .catch(compose(
      compose(dispatch, toggleSnackbar),
      handleErrorResponse(dispatch, createError("CHANGE_ENDPOINT"))
    ))
}
