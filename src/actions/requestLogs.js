import * as types from "./types"
import { domain, setFetchSettings } from "./utils"

export const setLogs = logs => ({
  type: types.SET_LOGS,
  logs
})

export const deleteLogsFromStore = ids => ({
  type: types.DELETE_LOGS,
  ids
})


export const fetchRequests = () => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("GET", accessToken, null)

  fetch(`${domain}/request-logs`, settings)
    .then(response => response.json().then(json => 
      response.ok ? Promise.resolve(json) : Promise.reject(json)
    ))
    .then(response => {
      console.log(response.data)
      dispatch(setLogs(response.data))
    })
    .catch(err => {
      console.log(err)
    })
} 

export const deleteLogs = id => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const ids = JSON.stringify({ data: id }) 
  const settings = setFetchSettings("DELETE", accessToken, ids)

  dispatch(deleteLogsFromStore(id))

  fetch(`${domain}/request-logs`, settings)
    .then(response => response.json().then(json => 
      response.ok ? Promise.resolve(json) : Promise.reject(json)
    ))
    .then(() => {
      dispatch(deleteLogsFromStore(id))
    })
    .catch(err => {
      console.log(err)
    })
}
