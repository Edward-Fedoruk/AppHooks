import { domain, setFetchSettings } from "./utils"
import * as types from "./types"

export const setUsers = users => ({
  type: types.SET_USERS,
  users
})


export const fetchUsers = () => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("GET", accessToken, null)

  fetch(`${domain}/users`, settings)
  .then(response => response.json().then(json => 
    response.ok ? Promise.resolve(json) : Promise.reject(json)
  ))
  .then(response => {
    console.log(response.data)
    dispatch(setUsers(response.data))
  })
  .catch(err => {
    console.log(err)
  })
} 