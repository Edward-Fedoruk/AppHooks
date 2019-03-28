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
import destinations from "./destinations"
import statistics from "./statistics"

export default combineReducers({
  view,
  authentication,
  channels,
  stages,
  channelsEntities,
  destinations,
  requestLogs,
  users,
  rules,
  userSettings,
  preloader,
  errorHandler,
  statistics
})
