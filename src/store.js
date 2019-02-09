import { createStore, applyMiddleware } from "redux"
import { compose } from "redux"
import thunk from "redux-thunk"
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reducers"

const configureStore = (preloadState) => {
  const enhanceWith = compose(
    composeWithDevTools,
    applyMiddleware
  )
  const middlewares = enhanceWith(thunk)
  const store = createStore(rootReducer, preloadState, middlewares)

  if (module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer))
  }

  return store
}

export default configureStore
