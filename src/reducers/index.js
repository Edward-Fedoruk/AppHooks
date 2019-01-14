import { combineReducers } from 'redux'
import authentication from './authForms'
import channels from './channels'
import view from './view'
import channelsEntities from './channelsEntities'

export default combineReducers({
  view,
  authentication,
  channels,
  channelsEntities
})