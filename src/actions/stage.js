import * as types from "./types"
import { stageSchema } from './schemas'

export const setStagesData = (payload) => ({
  type: types.SET_STAGES,
  payload
})

export const throwStageCreationError = (error) => ({
  type: types.CREATE_STAGE_ERROR,
  error
})

export const createStage = (id, stageData, routeHistory) => dispatch => { 
  const accessToken = localStorage.getItem("JWT")
  
  const stringifiedData = JSON.stringify(stageData)

  fetch(`http://app.develop.apphooks.io/apps/${id}/stages`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + accessToken
    },
    body: stringifiedData
  })
  .then((response) => {
    return response.json()
    .then((json) => {
      if (response.ok) {
        return Promise.resolve(json)
      }
      return Promise.reject(json)
    })
  })
  .then(data => {
    console.log(data)
    dispatch(setStagesData(data))
  })
  .catch(er =>{
    console.log(er)
    dispatch(throwStageCreationError(er.message))
  })
} 