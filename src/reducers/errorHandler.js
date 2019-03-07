export default (state = {}, action) => {
  const { type, error } = action
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type)
  let errorMessages

  if (!matches) return state

  if (error === undefined) {
    errorMessages = "something went wrong"
  } else if (error.errors) {
    errorMessages = Object.values(error.errors).flat().join("\n")
  } else if (error.message) {
    errorMessages = error.message
  } else {
    errorMessages = "something went wrong"
  }

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: requestState === "FAILURE" ? errorMessages : "Something went wrong",
  }
}
