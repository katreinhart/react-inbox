import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED } from '../actions'

const initialState = { 
  messages: [],
  showCompose: false
}

function messages(state = initialState, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      const messages = action.messages
      return [...messages]

    default:
      return state
  }
}

function showCompose (state = initialState, action ) {
  switch(action.type) {
    case 'SHOW_COMPOSE': 
      return {
        ...state,
        showCompose: true
      }
    case 'HIDE_COMPOSE':
      return {
        ...state,
        showCompose: false
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  messages: messages,
  showCompose: showCompose,
})

export default rootReducer
