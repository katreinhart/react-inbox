import { combineReducers } from 'redux'
import {
  MESSAGES_RECEIVED,
  TOGGLE_COMPOSE,
  SEND_MESSAGE,
  TOGGLE_CHECK
} from '../actions'

const initialState = { 
  messages: [],
  showCompose: false
}

function messages(state = initialState, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return [...action.messages]
    case SEND_MESSAGE:
      return [...state, action.message]
    case TOGGLE_CHECK: 
      return state.map(msg => {
        if(msg.id !== action.id) return msg
        else return { ...msg, selected: !msg.selected }
      })
    default:
      return state
  }
}

function toggleCompose (state = initialState, action ) {
  switch(action.type) {
    case TOGGLE_COMPOSE:
      return !state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  messages: messages,
  showCompose: toggleCompose,
})

export default rootReducer
