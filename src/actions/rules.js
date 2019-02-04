import * as types from "./types"
import { domain, setFetchSettings } from "./utils"
import { toggleEditForm } from "./ui"

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

export const editRuleInStore = (id, newRule) => ({
  type: types.EDIT_RULE,
  newRule,
  id
}) 

export const deleteRuleFromStore = id => ({
  type: types.DELETE_RULE,
  id
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
    dispatch(setRule(response.data))
    dispatch(toggleEditForm())
  })
  .catch(err => {
    console.log(err)
  })
}

export const createRule = data => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("POST", accessToken, JSON.stringify(data))

  console.log(data)
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

export const editRule = (id, data) => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("PUT", accessToken, JSON.stringify(data))

  fetch(`${domain}/recipes/${id}`, settings)
  .then(response => response.json().then(json => 
    response.ok ? Promise.resolve(json) : Promise.reject(json)
  ))
  .then(response => {
    console.log(response.data, id)
    dispatch(editRuleInStore(id, response.data))
    dispatch(toggleEditForm())
  })
  .catch(err => {
    console.log(err)
  })
}

export const deleteRule = id => dispatch => {
  const accessToken = localStorage.getItem("JWT")
  const settings = setFetchSettings("DELETE", accessToken, null)

  fetch(`${domain}/recipes/${id}`, settings)
  .then(response =>  
    response.ok ? Promise.resolve() : Promise.reject()
  )
  .then(response => {
    dispatch(deleteRuleFromStore(id))
  })
  .catch(err => {
    console.log(err)
  })
}