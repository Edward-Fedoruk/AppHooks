import * as types from "./types"

export const toggleNavBar = () => ({
  type: types.NAV_BAR,
})

export const toggleSnackbar = () => ({
  type: types.TOGGLE_SNACKBAR
})

export const changeStage = (stage) => ({
  type: types.CHANGE_STAGE,
  stage
})