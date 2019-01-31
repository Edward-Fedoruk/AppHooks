import { domain, setFetchSettings } from "./utils"
import * as types from "./types"
import { toggleSnackbar } from "./ui"

export const setUsers = users => ({
  type: types.SET_USERS,
  users
})

export const setUser = users => ({
  type: types.SET_USER,
  users
})

export const addUser = user => ({
  type: types.ADD_USER,
  user
})

export const throwInviteError = err => ({
  type: types.INVITE_ERROR,
  err
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

export const fetchUser = () => dispatch => {
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

export const inviteUser = data => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("POST", accessToken, JSON.stringify(data))
  
  fetch(`${domain}/users`, settings)
  .then(response => response.json().then(json => 
    response.ok ? Promise.resolve(json) : Promise.reject(json)
  ))
  .then(response => {
    console.log(response.data)
    dispatch(addUser(response.data))
  })
  .catch(({ errors }) => {
    console.log(errors)
    dispatch(throwInviteError(errors.email[0]))
    dispatch(toggleSnackbar())
  })
} 