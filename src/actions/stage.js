import { normalize } from "normalizr"
import * as types from "./types"
import { stageSchema } from "./schemas"
import axios, { handleErrorResponse, createError } from "./utils"
import history from "../history"
import { toggleCreateStageForm, changeStage, toggleSuccessSnackbar } from "./ui"

export const setStagesData = (payload, id) => ({
  type: types.CREATE_STAGE_SUCCESS,
  payload,
  id,
})

export const throwStageCreationError = error => ({
  type: types.CREATE_STAGE_FAILURE,
  error,
})

export const setCurrentStage = stage => ({
  type: types.SET_CURRENT_STAGE,
  stage,
})

export const addStageId = id => ({
  type: types.ADD_STAGE_TO_CURRENT_CHANNEL,
  id,
})

export const removeStage = (channelId, stageId) => ({
  type: types.REMOVE_STAGE_SUCCESS,
  channelId,
  stageId,
})

export const editStageNameInStore = (channelId, stageId, newName) => ({
  type: types.EDIT_STAGE_NAME_SUCCESS,
  channelId,
  stageId,
  newName,
})

export const createStage = (id, stageData) => (dispatch) => {
  axios.post(`/apps/${id}/stages`, stageData)
    .then(({ data: { data } }) => {
      const normalizedData = normalize(data, stageSchema)
      dispatch(setStagesData(normalizedData, id, data.id))
      if (history.location.pathname.split("/").reverse()[0] === `${id}`) {
        dispatch(addStageId(data.id))
        dispatch(toggleCreateStageForm())
      }
    })
    .catch((er) => {
      console.log(er.response)
      dispatch(throwStageCreationError(er.message))
    })
}

export const deleteStage = (channelId, stageId) => (dispatch) => {
  axios.delete(`/apps/${channelId}/stages/${stageId}`)
    .then(() => {
      dispatch(removeStage(channelId, stageId))
      dispatch(changeStage(0))
      dispatch(toggleSuccessSnackbar("Stage was deleted"))
    })
    .catch(handleErrorResponse(dispatch, createError("REMOVE_STAGE")))
}

export const editStageName = (channelId, stageId, newName) => (dispatch) => {
  axios.put(`/apps/${channelId}/stages/${stageId}`, newName)
    .then(() => {
      dispatch(editStageNameInStore(channelId, stageId, newName))
      dispatch(toggleSuccessSnackbar("Stage name was edited"))
    })
    .catch(() => {})
}
