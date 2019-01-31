import { combineReducers } from "redux"
import authentication from "./authForms"
import channels from "./channels"
import view from "./view"
import channelsEntities from "./channelsEntities"
import stages from "./stages"
import requestLogs from "./requestLogs"
import users from "./users"

export default combineReducers({
  view,
  authentication,
  channels,
  stages,
  channelsEntities,
  requestLogs,
  users
})