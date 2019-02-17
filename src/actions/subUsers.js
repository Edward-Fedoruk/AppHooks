import { compose } from "redux"
import {
  initiateLoading,
  createError,
  handleResponse,
  handleErrorResponse,
} from "./utils"
import * as types from "./types"
import { toggleSnackbar } from "./ui"
import axios from "./utils"

export const setUsers = users => ({
  type: types.SET_USERS_SUCCESS,
  users,
})

export const setUser = users => ({
  type: types.SET_USER,
  users,
})

export const addUser = user => ({
  type: types.ADD_USER,
  user,
})

export const throwInviteError = err => ({
  type: types.INVITE_ERROR_FAILURE,
  err,
})

export const removeUserFromStore = id => ({
  type: types.DELETE_USER,
  id,
})

export const changeUserInStore = userData => ({
  type: types.CHANGE_USER_PRIVILEGES,
  userData,
})

export const fetchUsers = () => (dispatch) => {
  dispatch(initiateLoading("SET_USERS"))
  axios.get("/users")
    .then(handleResponse(dispatch, setUsers))
    .catch(handleErrorResponse(dispatch, createError("SET_USERS")))
}

export const inviteUser = data => (dispatch) => {
  axios.post("/users", data)
    .then(handleResponse(dispatch, addUser))
    .catch(({ response: { data } }) => {
      dispatch(createError("INVITE_ERROR")(data))
      dispatch(toggleSnackbar())
    })
}

export const deleteUser = id => (dispatch) => {
  axios.delete(`/users/${id}`)
    .then(() => compose(dispatch, removeUserFromStore)(id))
    .catch((error) => {
      console.log(error)
    })
}

export const updateSubUser = (id, data) => (dispatch) => {
  console.log(id, data)
  axios.put(`/users/${id}`, data)
    .then(handleResponse(dispatch, changeUserInStore))
    .catch(({ response: { data } }) => {
      console.log(data)
    })
}
