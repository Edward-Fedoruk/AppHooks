import { normalize } from "normalizr"
import * as types from "./types"
import { stageSchema } from "./schemas"
import axios from "./utils"
import history from "../history"

export const setStagesData = (payload, id) => ({
  type: types.SET_STAGES,
  payload,
  id,
})

export const throwStageCreationError = error => ({
  type: types.CREATE_STAGE_ERROR,
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

export const createStage = (id, stageData) => (dispatch) => {
  axios.post(`/apps/${id}/stages`, stageData)
    .then(({ data: { data } }) => {
      const normalizedData = normalize(data, stageSchema)
      dispatch(setStagesData(normalizedData, id, data.id))

      if (history.location.pathname.split("/").reverse()[0] === `${id}`) {
        dispatch(addStageId(data.id))
      }
    })
    .catch((er) => {
      console.log(er.response)
      dispatch(throwStageCreationError(er.message))
    })
}
