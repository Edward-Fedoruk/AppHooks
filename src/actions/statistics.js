// import { compose } from "redux"
// import {
//   handleResponse,
//   handleErrorResponse,
// } from "./utils"
// import * as types from "./types"
import axios from "./utils"

export const stageBreakedown = (channelId, stageId) => () => {
  axios.get(`apps/${channelId}/${stageId}/statistics/deliverability/breakdown`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

export const stageSummary = (channelId, stageId) => () => {
  axios.get(`apps/${channelId}/${stageId}/statistics/deliverability/summary`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

export const stageTotal = (channelId, stageId) => () => {
  axios.get(`apps/${channelId}/${stageId}/statistics/total`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

export const endpointsBreakedown = endpointId => () => {
  axios.get(`endpoints/${endpointId}/statistics/deliverability/breakdown`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

export const endpointsSummary = endpointId => () => {
  axios.get(`endpoints/${endpointId}/statistics/deliverability/summary`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

export const endpointsTotal = endpointId => () => {
  axios.get(`endpoints/${endpointId}/statistics/total`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

export const generalBreackdow = () => () => {
  axios.get("/statistics/deliverability/breakdown")
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

export const generalSummary = () => () => {
  axios.get("/statistics/deliverability/summary")
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

export const generalInProcess = () => () => {
  axios.get("/statistics/hooks/in-process")
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}
