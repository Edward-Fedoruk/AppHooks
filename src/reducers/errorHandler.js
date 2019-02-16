
export default (state = {}, action) => {
  const { type, error } = action
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type)

  if (!matches) return state

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: requestState === "FAILURE" ? error.message : "",
  }
}
