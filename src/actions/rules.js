import * as types from "./types"
import { domain, setFetchSettings } from "./utils"

export const setRules = recipes => ({
  type: types.SET_RULES,
  recipes
})

export const setRule = recipe => ({
  type: types.SET_RULE,
  recipe
})

export const addRule = recipe => ({
  type: types.ADD_RULE,
  recipe
})

export const fetchRules = () => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("GET", accessToken, null)

  fetch(`${domain}/recipes`, settings)
  .then(response => response.json().then(json => 
    response.ok ? Promise.resolve(json) : Promise.reject(json)
  ))
  .then(response => {
    console.log(response.data)
    dispatch(setRules(response.data))
  })
  .catch(err => {
    console.log(err)
  })
}

export const fetchRule = id => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("GET", accessToken, null)

  fetch(`${domain}/recipes/${id}`, settings)
  .then(response => response.json().then(json => 
    response.ok ? Promise.resolve(json) : Promise.reject(json)
  ))
  .then(response => {
    console.log(response.data)
    dispatch(addRule(response.data))
  })
  .catch(err => {
    console.log(err)
  })
}

export const createRule = data => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("GET", accessToken, JSON.stringify(data))

  fetch(`${domain}/recipes`, settings)
  .then(response => response.json().then(json => 
    response.ok ? Promise.resolve(json) : Promise.reject(json)
  ))
  .then(response => {
    console.log(response.data)
    dispatch(addRule(response.data))
  })
  .catch(err => {
    console.log(err)
  })
}