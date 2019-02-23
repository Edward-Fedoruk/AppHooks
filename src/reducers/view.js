import * as types from "../actions/types"

const initialState = {
  open: false,
  snackbar: false,
  successSnackbar: false,
  currentStage: 0,
  editRuleForm: false,
  billingForm: false,
  billingPrice: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.NAV_BAR:
    return { ...state, open: !state.open }
  case types.TOGGLE_SNACKBAR:
    return { ...state, snackbar: !state.snackbar }
  case types.TOGGLE_SUCCESS_SNACKBAR:
    return {
      ...state,
      successSnackbar: !state.successSnackbar,
      successMessage: action.successMessage,
    }
  case types.CHANGE_STAGE:
    return { ...state, currentStage: action.stage }
  case types.TOGGLE_EDIT_RULE_FORM:
    return { ...state, editRuleForm: !state.editRuleForm }
  case types.TOGGLE_BILLING_FORM:
    console.log(action.price)
    return {
      ...state,
      billingPrice: action.price,
      billingForm: !state.billingForm,
    }
  default:
    return state
  }
}
