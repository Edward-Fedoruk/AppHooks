import { compose } from "redux"
import * as types from "./types"
import axios, {
  handleErrorResponse,
  createError,
  handleResponse,
  initiateLoading,
} from "./utils"
import { toggleCreateDestinationForm, toggleSnackbar, toggleSuccessSnackbar } from "./ui"

export const setDestinationInStore = destination => ({
  type: types.CREATE_DESTINATION_SUCCESS,
  destination,
})

export const deleteDestinationFromStore = id => ({
  type: types.DELETE_DESTINATION_SUCCESS,
  id,
})

export const setDestinationsInStore = destinations => ({
  type: types.FETCH_DESTINATIONS_SUCCESS,
  destinations,
})

export const editDestinationInStore = id => ({
  type: types.EDIT_DESTINATION_SUCCESS,
  id,
})

export const fetchDestinations = endpointId => (dispatch) => {
  dispatch(initiateLoading("FETCH_DESTINATIONS"))

  axios.get(`/endpoints/${endpointId}/destinations`)
    .then((response) => {
      handleResponse(dispatch, setDestinationsInStore)(response)
      dispatch(toggleSuccessSnackbar("FETCH_DESTINATIONS"))
    })
    .catch((response) => {
      handleErrorResponse(dispatch, createError("FETCH_DESTINATIONS"))(response)
      dispatch(toggleSnackbar())
    })
}

export const editDestination = (endpointId, destinationId, destData) => (dispatch) => {
  axios.put(`/endpoints/${endpointId}/destinations/${destinationId}`, destData)
    .then((response) => {
      handleResponse(dispatch, setDestinationsInStore)(response)
      dispatch(toggleSuccessSnackbar("Destination was edited"))
    })
    .catch((response) => {
      handleErrorResponse(dispatch, createError("FETCH_DESTINATIONS"))(response)
      dispatch(toggleSnackbar())
    })
}

export const createDestination = (endpointId, destinationData) => (dispatch) => {
  axios.post(`/endpoints/${endpointId}/destinations`, destinationData)
    .then((response) => {
      console.log(response)
      handleResponse(dispatch, setDestinationInStore)(response)
      dispatch(toggleSuccessSnackbar("Destination was created"))
      dispatch(toggleCreateDestinationForm())
    })
    .catch(response => console.log(response))
}

export const deleteDestination = (endpointId, destinationId) => (dispatch) => {
  axios.delete(`/endpoints/${endpointId}/destinations/${destinationId}`)
    .then(() => {
      dispatch(deleteDestinationFromStore(destinationId))
      dispatch(toggleSuccessSnackbar("Endpoint was deleted"))
    })
    .catch(handleErrorResponse(
      compose(dispatch, toggleSnackbar),
      createError("DELETE_DESTINATION")
    ))
}
