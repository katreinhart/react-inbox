import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import logger from 'redux-logger'

const initialState = { 
  messages: []
}

const middleware = [
  logger,
  thunk,
]

const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
  )
);

export default store
