import { createStore, applyMiddleware } from "redux"
import { compose } from "redux"
import thunk from "redux-thunk"
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction"
import rootReducer from "./reducers"

const configureStore = (preloadState) => {
  const enhanceWith = compose(
    composeWithDevTools,
    applyMiddleware
  )
  const middlewares = enhanceWith(thunk)
  const store = createStore(rootReducer, preloadState, middlewares)

  return store
}

export default configureStore()
