import { normalize } from "normalizr"
import * as types from "./types"
import { stageSchema } from "./schemas"
import axios from "./utils"

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

export const createStage = (id, stageData, routeHistory) => (dispatch) => {
  axios.post(`/apps/${id}/stages`, stageData)
    .then(({ data: { data } }) => {
      const normalizedData = normalize(data, stageSchema)
      dispatch(setStagesData(normalizedData, id, data.id))
    })
    .then(() => routeHistory.push(`/channels/${id}`))
    .catch((er) => {
      console.log(er.response)
      dispatch(throwStageCreationError(er.message))
    })
}
