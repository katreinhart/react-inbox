import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import logger from 'redux-logger'

export const initialState = { 
  messages: [],
  showCompose: false
}

const middleware = [
  logger,
  thunk,
]

const store = createStore(
  rootReducer, 
  initialState, 
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
)

export default store
