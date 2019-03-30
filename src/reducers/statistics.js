const initialState = {
  stage: {
    summary: { requestStats: [], deliverability: "" },
    breakdown: {},
    total: {},
  },
  endpoint: {
    summary: {},
    breakdown: {},
    total: {},
  },
}

export default (state = initialState, action) => {
  const matches = /(STAGE|ENDPOINT)_(SUMMARY|BREAKDOWN|TOTAL)_STATS/.exec(action.type)

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
