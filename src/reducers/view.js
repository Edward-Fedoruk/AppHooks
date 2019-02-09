import * as types from "../actions/types"

const initialState = {
  open: false,
  snackbar: false,
  currentStage: 0,
  editRuleForm: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.NAV_BAR:
    return { ...state, open: !state.open }
  case types.TOGGLE_SNACKBAR:
    return { ...state, snackbar: !state.snackbar }
  case types.CHANGE_STAGE:
    return { ...state, currentStage: action.stage }
  case types.TOGGLE_EDIT_RULE_FORM:
    return { ...state, editRuleForm: !state.editRuleForm }
  default:
    return state
  }
}
