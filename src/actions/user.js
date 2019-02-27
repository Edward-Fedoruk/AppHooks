import axios, {
  initiateLoading,
  handleResponse,
  createError,
  handleErrorResponse,
} from "./utils"
import * as types from "./types"
import { toggleSnackbar } from "./ui"

export const setUserToStore = data => ({
  type: types.SET_USER_SETTINGS_SUCCESS,
  data,
})

export const throwError = error => ({
  type: types.SETTINGS_ERROR,
  error,
})

export const fetchUserSettings = () => (dispatch) => {
  dispatch(initiateLoading("SET_USER_SETTINGS"))

  axios.get("/profile")
    .then(handleResponse(dispatch, setUserToStore))
    .catch(handleErrorResponse(dispatch, createError("SET_USER_SETTINGS")))
}

export const changeUserSettings = data => (dispatch) => {
  axios.put("/profile", data)
    .then(handleResponse(dispatch, setUserToStore))
    .catch((response) => {
      dispatch(throwError(response))
      dispatch(toggleSnackbar())
    })
}

export const changeUserPassword = data => (dispatch) => {
  axios.put("/profile/change-password", data)
    .then(response => console.log(response))
    .catch((err) => {
      dispatch(throwError(err))
      dispatch(toggleSnackbar())
    })
}

export const deleteAccount = () => (dispatch) => {
  axios.delete("/profile")
    .then(response => console.log(response))
    .catch((err) => {
      dispatch(throwError(err))
      dispatch(toggleSnackbar())
    })
}
