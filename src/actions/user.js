import { setFetchSettings, domain } from "./utils"
import * as types from "./types"

export const setUserToStore = data => ({
  type: types.SET_USER_SETTINGS,
  data 
}) 

export const ThrowGeneralInfoError = error => ({
  type: types.GENERAL_INFO_ERROR,
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

  fetch(`${domain}/profile/update`, settings)
  .then(response => response.json().then(json => 
    response.ok ? Promise.resolve(json) : Promise.reject(json)
  ))
  .then(response => {
    console.log(response.data)
    dispatch(setUserToStore(response.data))
  })
  .catch(err => {
    console.log(err)
    dispatch(ThrowGeneralInfoError(err))
  })
}
