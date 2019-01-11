import { combineReducers } from 'redux'
import authentication from './authForms'
import channels from './channels'

export default combineReducers({
  authentication,
  channels
})