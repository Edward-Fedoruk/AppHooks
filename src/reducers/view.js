import * as types from "../actions/types"

const initialState = {
  open: false,
  snackbar: false,
  successSnackbar: false,
  currentStage: 0,
  editRuleForm: false,
  createChannelForm: false,
  createRuleForm: false,
  billingForm: false,
  billingPrice: 0,
  shortcutPanel: false,
  createStageForm: false,
  editStageNameForm: false,
  createEndpointForm: false,
  editEndpointForm: false,
  endpointInfo: {},
  endpointDeleteDialog: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.NAV_BAR:
    return { ...state, open: !state.open }
  case types.TOGGLE_CREATE_CHANNEL_FORM:
    return { ...state, createChannelForm: !state.createChannelForm }
  case types.TOGGLE_SNACKBAR:
    return { ...state, snackbar: !state.snackbar }
  case types.TOGGLE_CREATE_RULE_FORM:
    return { ...state, createRuleForm: !state.createRuleForm }
  case types.TOGGLE_CREATE_STAGE_FORM:
    return { ...state, createStageForm: !state.createStageForm }
  case types.TOGGLE_EDIT_STAGE_NAME_FORM:
    return { ...state, editStageNameForm: !state.editStageNameForm }
  case types.TOGGLE_CREATE_ENDPOINT_FORM:
    return { ...state, createEndpointForm: !state.createEndpointForm }
  case types.TOGGLE_SUCCESS_SNACKBAR:
    return {
      ...state,
      successSnackbar: !state.successSnackbar,
      successMessage: action.successMessage,
    }
  case types.TOGGLE_SHORTCUT_PANEL:
    return {
      ...state,
      shortcutPanel: !state.shortcutPanel,
    }
  case types.TOGGLE_EDIT_ENDPOINT_FORM:
    return { ...state, editEndpointForm: !state.editEndpointForm, endpointInfo: action.endpointInfo }
  case types.TOGGLE_DELETE_ENDPOINT_DIALOG:
    return { ...state, endpointInfo: action.endpointInfo, endpointDeleteDialog: !state.endpointDeleteDialog }
  case types.CHANGE_STAGE:
    return { ...state, currentStage: action.stage }
  case types.TOGGLE_EDIT_RULE_FORM:
    return { ...state, editRuleForm: !state.editRuleForm }
  case types.TOGGLE_BILLING_FORM:
    return {
      ...state,
      billingPrice: action.price,
      billingForm: !state.billingForm,
    }
  default:
    return state
  }
}
