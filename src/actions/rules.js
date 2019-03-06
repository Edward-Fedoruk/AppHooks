import { compose } from "redux"
import * as types from "./types"
import {
  initiateLoading,
  createError,
  handleErrorResponse,
  handleResponse,
} from "./utils"
import axios from "./utils"
import {
  toggleEditForm,
  toggleSnackbar,
  toggleSuccessSnackbar,
  toggleCreateForm,
} from "./ui"

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
    .then(handleResponse(dispatch, setRules))
    .catch(compose(
      compose(dispatch, toggleSnackbar),
      handleErrorResponse(dispatch, throwRuleErr)
    ))
}

export const fetchRule = id => (dispatch) => {
  axios.get(`/recipes/${id}`)
    .then((response) => {
      handleResponse(dispatch, setRule)(response)
      dispatch(toggleEditForm())
    })
    .catch(handleErrorResponse(dispatch, throwRuleErr))
}

export const createRule = data => (dispatch) => {
  axios.post("/recipes", data)
    .then((response) => {
      handleResponse(dispatch, addRule)(response)
      dispatch(toggleCreateForm())
      dispatch(toggleSuccessSnackbar("Rule was created"))
    })
    .catch((response) => {
      handleErrorResponse(dispatch, throwRuleErr)(response)
      dispatch(toggleSnackbar())
    })
}

export const editRule = (id, data) => (dispatch) => {
  axios.put(`/recipes/${id}`, data)
    .then(({ data: { data } }) => {
      console.log(data, id)
      dispatch(editRuleInStore(id, data))
      dispatch(toggleEditForm())
      dispatch(toggleSuccessSnackbar("Rule Was edited"))
    })
    .catch(() => {
      handleErrorResponse(dispatch, throwRuleErr)
      dispatch(toggleSnackbar())
    })
}

export const deleteRule = id => (dispatch) => {
  axios.delete(`/recipes/${id}`)
    .then(() => {
      compose(dispatch, deleteRuleFromStore)(id)
      dispatch(toggleSuccessSnackbar("Rule was deleted"))
    })
    .catch(() => {
      handleErrorResponse(dispatch, throwRuleErr)
      dispatch(toggleSnackbar())
    })
}
