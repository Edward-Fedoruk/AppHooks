import { combineReducers } from "redux"
import authentication from "./authForms"
import channels from "./channels"
import view from "./view"
import channelsEntities from "./channelsEntities"
import stages from "./stages"
import requestLogs from "./requestLogs"
import users from "./users"
import rules from "./rules"
import userSettings from "./userSettings"
import preloader from "./preloader"
import errorHandler from "./errorHandler"

export default combineReducers({
  view,
  authentication,
  channels,
  stages,
  channelsEntities,
  requestLogs,
  users,
  rules,
  userSettings,
  preloader,
  errorHandler,
})
