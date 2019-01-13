import { combineReducers } from 'redux'
import authentication from './authForms'
import channels from './channels'
import view from './view'

export default combineReducers({
  view,
  authentication,
  channels
})