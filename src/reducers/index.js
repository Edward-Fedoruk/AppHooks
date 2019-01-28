import { combineReducers } from "redux"
import authentication from "./authForms"
import channels from "./channels"
import view from "./view"
import channelsEntities from "./channelsEntities"
import stages from "./stages"
import requestLogs from "./requestLogs"

export default combineReducers({
  view,
  authentication,
  channels,
  stages,
  channelsEntities,
  requestLogs
})