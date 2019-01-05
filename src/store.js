import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { compose } from 'redux'

const configureStore = preloadState => {
  const enhanceWith = compose(
    composeWithDevTools,
    applyMiddleware
  )
  const middlewares = enhanceWith(thunk) 
  const store = createStore(rootReducer, preloadState, middlewares)

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

export default configureStore