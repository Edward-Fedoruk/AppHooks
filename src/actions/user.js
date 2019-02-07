import { setFetchSettings, domain } from "./utils"
import * as types from "./types"
import { toggleSnackbar } from "./ui"

export const setUserToStore = data => ({
  type: types.SET_USER_SETTINGS,
  data 
}) 

export const throwError = error => ({
  type: types.SETTINGS_ERROR,
  error
})

export const fetchUserSettings = () => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("GET", accessToken, null)

  fetch(`${domain}/profile`, settings)
  .then(response => response.json().then(json => 
    response.ok ? Promise.resolve(json) : Promise.reject(json)
  ))
  .then(response => {
    console.log(response.data)
    dispatch(setUserToStore(response.data))
  })
  .catch(err => {
    console.log(err)
  })  
}

export const changeUserSettings = data => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("PUT", accessToken, JSON.stringify(data))

  fetch(`${domain}/profile`, settings)
  .then(response => response.json().then(json => 
    response.ok ? Promise.resolve(json) : Promise.reject(json)
  ))
  .then(response => {
    console.log(response.data)
    dispatch(setUserToStore(response.data))
  })
  .catch(err => {
    console.log(err)
    dispatch(throwError(err))
    dispatch(toggleSnackbar())
  })
}

export const changeUserPassword = data => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("PUT", accessToken, JSON.stringify(data))

  fetch(`${domain}/profile/change-password`, settings)
  .then(response => !response.ok 
    ? response.json().then(json => Promise.reject(json)) 
    : response
  )
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err)
    dispatch(throwError(err))
    dispatch(toggleSnackbar())
  })
}

export const deleteAccount = () => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("DEL", accessToken, null)

  fetch(`${domain}/profile`, settings)
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err)
    dispatch(throwError(err))
    dispatch(toggleSnackbar())
  })
}
