// import { compose } from "redux"
import {
  handleResponse,
  // handleErrorResponse,
} from "./utils"
import * as types from "./types"
import axios from "./utils"
import { TimeSeries, TimeRange } from "pondjs"

const createStatsAction = entityType => entityStatsType => payload => ({
  type: types[`${entityType}_${entityStatsType}_STATS`],
  payload,
})

// const setEndpointStats = createStatsAction("ENDPOINT")
const setStageStats = createStatsAction("STAGE")

export const stageBreakdown = (channelId, stageId) => (dispatch) => {
  axios.get(`apps/${channelId}/${stageId}/statistics/deliverability/breakdown`)
    .then(({ data }) => {
      // getting obj key name because of bad name format(2019-21-20) in response
      const date = Object.keys(data)[0]
      const serverErrors = []
      const clientErrors = []
      const successes = []

      Object.entries(data[date]).forEach(([time, axis]) => {
        const milliseconds = Date.parse(`${date} ${time}`)
        serverErrors.push([milliseconds, axis["5xx"]])
        clientErrors.push([milliseconds, axis["4xx"]])
        successes.push([milliseconds, axis["2xx"]])
      })
      
      const timeSteps = Object.keys(data[date])
      const startTime = Date.parse(`${date} ${timeSteps[0]}`)
      const endTime = Date.parse(`${date} ${timeSteps.reverse()[0]}`)
      const chartRange = new TimeRange([startTime, endTime])

      const requestStats = { 
        chartRange,
        serverErrors: new TimeSeries({ 
          name: "serverErrors", 
          columns: ["time", "value"], 
          points: serverErrors 
        }), 
        clientErrors: new TimeSeries({ 
          name: "clientErrors", 
          columns: ["time", "value"], 
          points: clientErrors 
        }), 
        successes: new TimeSeries({ 
          name: "successes", 
          columns: ["time", "value"], 
          points: successes 
        }) 
      }


      console.log(requestStats)

      dispatch(setStageStats("BREAKDOWN")(requestStats))
    })
    .catch(response => console.log(response))
}

export const stageSummary = (channelId, stageId) => (dispatch) => {
  axios.get(`apps/${channelId}/${stageId}/statistics/deliverability/summary`)
    .then(({ data }) => {
      const getSummary = setStageStats("SUMMARY")

      const colors = ["#4ED8DA", "#F25252", "#C04DD8", "#828CB8", "#D7DEF1"]
      const requestStats = Object.entries(data)
        .filter(([name]) => name !== "deliverability")
        .map(([name, value], i) => ({ name, angle: value, color: colors[i] }))
      const summary = { requestStats, deliverability: data.deliverability }
      console.log(summary)
      dispatch(getSummary(summary))
    })
    .catch(() => {})
}

export const stageTotal = (channelId, stageId) => (dispatch) => {
  axios.get(`apps/${channelId}/${stageId}/statistics/total`)
    .then(({ data }) => {
      dispatch(setStageStats("TOTAL")(data))
    })
    .catch(() => {})
}

export const endpointsBreakdown = endpointId => () => {
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
