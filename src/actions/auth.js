import * as types from "./types"
import { toggleSnackbar } from "./ui"
import axios, { domain } from "./utils"
import history from "../history"
import { startTimer } from "./refreshToken"

export const throwAuthError = error => ({
  type: types.AUTH_ERROR,
  error,
})

export const createUser = userData => (dispatch) => {
  axios.post("/auth/register", userData)
    .then(() => {
      history.push({
        pathname: "/signup/success",
        state: { userData },
      })
    })
    .catch((er) => {
      const user = {
        isAuthenticated: false,
        errors: er.errors,
      }
      dispatch(throwAuthError(user))
    })
}

export const logIn = userData => (dispatch) => {
  const stringifiedData = JSON.stringify(userData)

  fetch(`${domain}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: stringifiedData,
  })
    .then(response => response.json()
      .then((json) => {
        if (response.ok) {
          return Promise.resolve(json)
        }
        return Promise.reject(json)
      }))
    .then((jsonData) => {
      localStorage.setItem("expTime", jsonData.expires_at)
      localStorage.setItem("JWT", jsonData.access_token)
      startTimer()
      history.push("/webhooks")
    })
    .catch((er) => {
      const user = {
        isAuthenticated: false,
        logInError: true,
        logInErrorMessage: er.message,
      }
      dispatch(throwAuthError(user))
      dispatch(toggleSnackbar())
    })
}

export const reSendEmail = email => (dispatch) => {
  axios("/auth/password/email", email)
    .catch((er) => {
      dispatch(throwAuthError({
        resendErrorMessage: er.message,
        resendError: true,
      }))
      dispatch(toggleSnackbar())
    })
}


export const resetPassword = userData => () => {
  const stringifiedData = JSON.stringify(userData)

  fetch(`${domain}/auth/password/reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: stringifiedData,
  })
    .then(response => response.json()
      .then((json) => {
        if (response.ok) {
          return Promise.resolve(json)
        }
        return Promise.reject(json)
      }))
    .then(() => {
      history.push({
        pathname: "/",
      })
    })
    .catch((er) => {
      console.log("reset err", er)
    })
}
