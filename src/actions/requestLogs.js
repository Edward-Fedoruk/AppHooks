import * as types from "./types"
import { handleResponse, handleErrorResponse, createError } from "./utils"
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

export const fetchRequests = () => (dispatch) => {
  axios.get("/request-logs")
    .then(handleResponse(dispatch, setLogs))
    .catch(handleErrorResponse(dispatch, createError("SET_LOGS")))
}

export const deleteLogs = id => (dispatch) => {
  const ids = JSON.stringify({ data: id })

  axios.delete("/request-logs", ids)
    .then(dispatch(deleteLogsFromStore(id)))
    .catch((err) => {
      console.log(err)
    })
}

export const fetchRequest = id => (dispatch) => {
  axios.get(`/request-logs/${id}`)
    .then(handleResponse(dispatch, setLog))
    .catch((err) => {
      console.log(err)
    })
}
