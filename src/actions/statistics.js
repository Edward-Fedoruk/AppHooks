import { compose } from "redux"
import {
  handleResponse,
  handleErrorResponse,
} from "./utils"
import * as types from "./types"
import axios from "./utils"

const stageBreakedown = (channelId, stageId) => (dispatch) => {
  axios.get(`apps/${channelId}/${stageId}/statistics/deliverability/breakdown`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

const stageSummary = (channelId, stageId) => (dispatch) => {
  axios.get(`apps/${channelId}/${stageId}/statistics/deliverability/summary`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

const stageTotal = (channelId, stageId) => (dispatch) => {
  axios.get(`apps/${channelId}/${stageId}/statistics/total`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

const endpointsBreakedown = endpointId => (dispatch) => {
  axios.get(`endpoints/${endpointId}/statistics/deliverability/breakdown`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

const endpointsSummary = endpointId => (dispatch) => {
  axios.get(`endpoints/${endpointId}/statistics/deliverability/summary`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

const endpointsTotal = endpointId => (dispatch) => {
  axios.get(`endpoints/${endpointId}/statistics/total`)
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

const generalBreackdow = () => (dispatch) => {
  axios.get("/statistics/deliverability/breakdown")
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

const generalSummary = () => (dispatch) => {
  axios.get("/statistics/deliverability/summary")
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}

const generalInProcess = () => (dispatch) => {
  axios.get("/statistics/hooks/in-process")
    .then((response) => {
      console.log(response)
    })
    .catch(() => {})
}
