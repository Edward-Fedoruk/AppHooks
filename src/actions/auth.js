import * as types from "./types"
import { compose } from 'redux'
import { domain } from './types'
import { toggleSnackbar } from './ui'

export const authenticate = (payload) => ({
  type: types.CREATE_USER,
  payload
})

export const throwAuthError = (error) => ({
  type: types.AUTH_ERROR,
  error
}) 

export const createUser = (userData, routeHistory) => dispatch => {
  const stringifiedData = JSON.stringify(userData)

  fetch(`${domain}/auth/register`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: stringifiedData
  })
    .then((response) => {
      return response.json()
      .then((json) => {
        if (response.ok) {
          return Promise.resolve(json)
        }
        return Promise.reject(json)
      })
    })
    .then(jsonData => {

      const user = { 
        isAuthenticated: true,
        errors: {}
      }        

      compose(dispatch, authenticate)(user)

      routeHistory.push({
        pathname: "/signup/success",
        state: { userData },
      })
    
    })
    .catch(er => {
      const user = {
        isAuthenticated: false,
        errors: er.errors,
      }     
      dispatch(throwAuthError(user))
    })
}

export const logIn = (userData, routeHistory) => dispatch => {
  const stringifiedData = JSON.stringify(userData)

  fetch(`${domain}/auth/login`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: stringifiedData
  })
  .then((response) => {
    return response.json()
    .then((json) => {
      if (response.ok) {
        return Promise.resolve(json)
      }
      return Promise.reject(json)
    })
  })
  .then(jsonData => {
    console.log(jsonData)

    localStorage.setItem("JWT", jsonData.access_token)
    const user = {
      isAuthenticated: true
    }

    compose(dispatch, authenticate)(user)

    routeHistory.push("/channels")

  })
  .catch(er => {
    const user = {
      isAuthenticated: false,
      logInError: true,
      logInErrorMessage: er.message
    }
    dispatch(throwAuthError(user))
    dispatch(toggleSnackbar(false))
  })
}

export const reSendEmail = (email, routeHistory) => dispatch => {
  const stringifiedData = JSON.stringify(email)

  fetch(`${domain}/auth/password/email`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: stringifiedData
  })
  .then((response) => {
    return response.json()
    .then((json) => {
      if (response.ok) {
        return Promise.resolve(json)
      }
      return Promise.reject(json)
    })
  })
  .then(jsonData => {
    console.log(jsonData, routeHistory)
  
    routeHistory.push({
      pathname: "/signup/success",
      state: { userData: { userEmail: email.email } }
    })
  })
  .catch(er => {
    dispatch(throwAuthError({
      resendErrorMessage: er.message,
      resendError: true
    }))
    console.log(er)
    dispatch(toggleSnackbar(false))
  }) 
}  


export const resetPassword = (userData, routeHistory) => dispatch => {
  const stringifiedData = JSON.stringify(userData)
  
  fetch(`${domain}/auth/password/reset`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: stringifiedData
  })
  .then((response) => {
    return response.json()
    .then((json) => {
      if (response.ok) {
        return Promise.resolve(json)
      }
      return Promise.reject(json)
    })
  })
  .then(() => {
    routeHistory.push({
      pathname: "/"
    })
  })
  .catch(er =>{
    console.log("reset err", er)
  })
} 