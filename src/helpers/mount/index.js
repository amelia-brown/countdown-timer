import React from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import App from '../../app'
import rootReducer from 'modules'

let middleware = []

if (process.env.NODE_ENV !== 'production') {
  let logger = createLogger()
  middleware.push(logger)
}

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(...middleware)
)

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
