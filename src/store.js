import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'

export default (initialState) => {
  const middleware = [thunk]
  // Add redux-logger if we're in development.
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(require('redux-logger').default)
  }

  return createStore(reducer, initialState, applyMiddleware(...middleware))
}
