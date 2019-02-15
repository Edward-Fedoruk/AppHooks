import * as types from "./types"

export const toggleNavBar = () => ({
  type: types.NAV_BAR,
})

export const toggleSnackbar = () => ({
  type: types.TOGGLE_SNACKBAR,
})

export const toggleEditForm = () => ({
  type: types.TOGGLE_EDIT_RULE_FORM,
})

export const toggleBillingForm = price => ({
  type: types.TOGGLE_BILLING_FORM,
  price,
})

export const changeStage = stage => ({
  type: types.CHANGE_STAGE,
  stage,
})
