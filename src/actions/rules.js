import { compose } from "redux"
import * as types from "./types"
import { initiateLoading, createError, handleErrorResponse } from "./utils"
import axios from "./utils"
import { toggleEditForm } from "./ui"

const throwRuleErr = createError("SET_RULES")

export const setRules = recipes => ({
  type: types.SET_RULES_SUCCESS,
  recipes,
})

export const setRule = recipe => ({
  type: types.SET_RULE,
  recipe,
})

export const addRule = recipe => ({
  type: types.ADD_RULE,
  recipe,
})


export const editRuleInStore = (id, newRule) => ({
  type: types.EDIT_RULE,
  newRule,
  id,
})

export const deleteRuleFromStore = id => ({
  type: types.DELETE_RULE,
  id,
})

export const fetchRules = () => (dispatch) => {
  dispatch(initiateLoading("SET_RULES"))

  axios.get("/recipes")
    .then(({ data: { data } }) => compose(dispatch, setRules)(data))
    .catch(handleErrorResponse(dispatch, throwRuleErr))
}

export const fetchRule = id => (dispatch) => {
  console.log("test")
  axios.get(`/recipes/${id}`)
    .then(({ data: { data } }) => {
      dispatch(setRule(data))
      dispatch(toggleEditForm())
    })
    .catch(handleErrorResponse(dispatch, throwRuleErr))
}

export const createRule = data => (dispatch) => {
  axios.post("/recipes", data)
    .then(({ data: { data } }) => compose(dispatch, addRule)(data))
    .catch(handleErrorResponse(dispatch, throwRuleErr))
}

export const editRule = (id, data) => (dispatch) => {
  axios.put(`/recipes/${id}`, data)
    .then(({ data: { data } }) => {
      console.log(data, id)
      dispatch(editRuleInStore(id, data))
      dispatch(toggleEditForm())
    })
    .catch(handleErrorResponse(dispatch, throwRuleErr))
}

export const deleteRule = id => (dispatch) => {
  axios.delete(`/recipes/${id}`)
    .then(() => compose(dispatch, deleteRuleFromStore)(id))
    .catch(handleErrorResponse(dispatch, throwRuleErr))
}
