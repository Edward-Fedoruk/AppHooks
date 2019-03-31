import { TimeSeries, TimeRange } from "pondjs"

const initialBreakdownState = {
  chartRange: new TimeRange([(Date.parse(new Date()) - 60000 * 5 * 5), Date.parse(new Date())]),
  serverErrors: new TimeSeries({ 
    name: "serverErrors", 
    columns: ["time", "value"], 
    points: [[Date.parse(new Date()), 0]] 
  }), 
  clientErrors: new TimeSeries({
    name: "clientErrors", 
    columns: ["time", "value"], 
    points: [[Date.parse(new Date()), 0]] 
  }),
  successes: new TimeSeries({ 
    name: "successes", 
    columns: ["time", "value"],
    points: [[Date.parse(new Date()), 0]] 
  }),
}

const initialState = {
  stage: {
    summary: { requestStats: [], deliverability: "" },
    breakdown: initialBreakdownState,
    total: {},
  },
  endpoint: {
    summary: { requestStats: [], deliverability: "" },
    breakdown: initialBreakdownState,
    total: {},
  },
  general: {
    summary: { requestStats: [], deliverability: "" },
    breakdown: initialBreakdownState,
    total: {},
  },
}

export default (state = initialState, action) => {
  const matches = /(GENERAL|STAGE|ENDPOINT)_(SUMMARY|BREAKDOWN|TOTAL)_STATS/.exec(action.type)

  if (matches !== null) {
    const entityType = matches[1].toLowerCase()
    const entityStatsType = matches[2].toLowerCase()

    return {
      ...state,
      [entityType]: {
        ...state[entityType],
        [entityStatsType]: action.payload,
      },
    }
  }

  return state
}
