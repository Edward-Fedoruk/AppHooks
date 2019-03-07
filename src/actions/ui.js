import * as types from "./types"

export const toggleNavBar = () => ({
  type: types.NAV_BAR,
})

export const toggleSnackbar = () => ({
  type: types.TOGGLE_SNACKBAR,
})

export const toggleSuccessSnackbar = successMessage => ({
  type: types.TOGGLE_SUCCESS_SNACKBAR,
  successMessage,
})

export const toggleEditForm = () => ({
  type: types.TOGGLE_EDIT_RULE_FORM,
})

export const toggleCreateForm = () => ({
  type: types.TOGGLE_CREATE_RULE_FORM,
})

export const toggleshortcutPanel = () => ({
  type: types.TOGGLE_SHORTCUT_PANEL,
})

export const toggleBillingForm = price => ({
  type: types.TOGGLE_BILLING_FORM,
  price,
})

export const toggleCreateChannelForm = () => ({
  type: types.TOGGLE_CREATE_CHANNEL_FORM,
})

export const changeStage = stage => ({
  type: types.CHANGE_STAGE,
  stage,
})
