import * as types from "./types"
import axios from "./utils"
import { TimeSeries, TimeRange } from "pondjs"
import { compose } from "redux"

const createStatsAction = entityType => entityStatsType => payload => ({
  type: types[`${entityType}_${entityStatsType}_STATS`],
  payload,
})

const setEndpointStats = createStatsAction("ENDPOINT")
const setStageStats = createStatsAction("STAGE")

// getting obj key name because of bad name format(2019-21-20) in response
const getDateFromResponse = data => {
  const date = Object.keys(data)[0] 
  const timeSteps = data[date]
  return { timeSteps, date }
}

const createChartRange = ({ timeSteps, date }) => {
  const timeStepsKeys = Object.keys(timeSteps).reverse
  const startTime = Date.parse(`${date} ${timeStepsKeys[5]}`)
  const endTime = Date.parse(`${date} ${timeStepsKeys[0]}`)
  return new TimeRange([startTime, endTime])
}

const setTimeSeriesForStats = stats => {
  return Object.entries(stats).reduce((accumulator, [key, value]) => ({
    ...accumulator,
    [key]: new TimeSeries({ 
      name: key, 
      columns: ["time", "value"], 
      points: value,
    }),
  }), {})
}

const splitToStats = ({ date, timeSteps }) => {
  const serverErrors = []
  const clientErrors = []
  const successes = []

  Object.entries(timeSteps).forEach(([time, axis]) => {
    const milliseconds = Date.parse(`${date} ${time}`)
    serverErrors.push([milliseconds, axis["5xx"]])
    clientErrors.push([milliseconds, axis["4xx"]])
    successes.push([milliseconds, axis["2xx"]])
  })

  return { serverErrors, clientErrors, successes }
} 

const createRequestStats = compose(
  setTimeSeriesForStats,
  splitToStats,
  getDateFromResponse,
)

const transformBreakdownData = ({ data }) => {
  const requestStats = createRequestStats(data)
  const chartRange = createChartRange(getDateFromResponse(data))
  return { ...chartRange, ...requestStats }
}

const handleStageBreakdownResponse = compose(
  setStageStats("BREAKDOWN"),
  transformBreakdownData
)

const handleEndpointBreakdownResponse = compose(
  setEndpointStats("BREAKDOWN"),
  transformBreakdownData,
)

export const stageBreakdown = (channelId, stageId) => (dispatch) => {
  axios.get(`apps/${channelId}/${stageId}/statistics/deliverability/breakdown`)
    .then(compose(dispatch, handleStageBreakdownResponse))
    .catch(response => console.log(response))
}


const generateStatsForChart = data => {
  const colors = ["#4ED8DA", "#F25252", "#C04DD8", "#828CB8", "#D7DEF1"]

  return Object.entries(data)
    .filter(([name]) => name !== "deliverability")
    .map(([name, value], i) => ({ name, angle: value, color: colors[i] }))
}

const transformSummary = ({ data }) => ({ 
  requestStats: generateStatsForChart(data), 
  deliverability: data.deliverability
})

const handleStageSummaryResponse = compose(
  setStageStats("SUMMARY"),
  transformSummary
)

const handleEndpointSummaryResponse = compose(
  setEndpointStats("SUMMARY"),
  transformSummary
)

export const stageSummary = (channelId, stageId) => (dispatch) => {
  axios.get(`apps/${channelId}/${stageId}/statistics/deliverability/summary`)
    .then(compose(dispatch, handleStageSummaryResponse))
    .catch(response => console.log(response))
}

export const stageTotal = (channelId, stageId) => (dispatch) => {
  axios.get(`apps/${channelId}/${stageId}/statistics/total`)
    .then(({ data }) => dispatch(setStageStats("TOTAL")(data)))
    .catch(response => console.log(response))
}

export const endpointsBreakdown = endpointId => (dispatch) => {
  console.log(endpointId)
  axios.get(`endpoints/${endpointId}/statistics/deliverability/breakdown`)
    .then(compose(dispatch, handleEndpointBreakdownResponse))
    .catch(response => console.log(response))
}

export const endpointsSummary = endpointId => (dispatch) => {
  axios.get(`endpoints/${endpointId}/statistics/deliverability/summary`)
    .then(compose(dispatch, handleEndpointSummaryResponse))
    .catch(response => console.log(response))
}

export const endpointsTotal = endpointId => (dispatch) => {
  axios.get(`endpoints/${endpointId}/statistics/total`)
    .then(({ data }) => dispatch(setEndpointStats("TOTAL")(data)))
    .catch(response => console.log(response))
}

export const generalBreakdown = () => () => {
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
