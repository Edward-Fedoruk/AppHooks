import { compose } from "redux"
import * as types from "./types"
import {
  handleResponse,
  handleErrorResponse,
  createError,
  initiateLoading,
} from "./utils"
import { toggleSuccessSnackbar, toggleSnackbar } from "./ui"
import axios from "./utils"

export const setLogs = logs => ({
  type: types.SET_LOGS_SUCCESS,
  logs,
})

export const deleteLogsFromStore = ids => ({
  type: types.DELETE_LOGS,
  ids,
})

export const setLog = log => ({
  type: types.SET_LOG,
  log,
})

export const setSearchText = searchText => ({
  type: types.LOGS_SEARCH_TEXT,
  searchText,
})

export const fetchRequests = () => (dispatch) => {
  dispatch(initiateLoading("SET_LOGS"))

  axios.get("/request-logs")
    .then(handleResponse(dispatch, setLogs))
    .catch(handleErrorResponse(dispatch, createError("SET_LOGS")))
}

export const deleteLogs = id => (dispatch) => {
  axios.delete("/request-logs", { id })
    .then(() => {
      dispatch(deleteLogsFromStore(id))
      dispatch(toggleSuccessSnackbar("Reuqest log was deleted"))
    })
    .catch(compose(
      compose(dispatch, toggleSnackbar),
      handleErrorResponse(dispatch, createError("SET_LOGS"))
    ))
}

export const fetchRequest = id => (dispatch) => {
  axios.get(`/request-logs/${id}`)
    .then(handleResponse(dispatch, setLog))
    .catch(handleErrorResponse(dispatch, createError("SET_LOGS")))
}
