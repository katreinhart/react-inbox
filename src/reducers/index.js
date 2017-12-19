import { combineReducers } from 'redux'
import {
  MESSAGES_RECEIVED,
  TOGGLE_COMPOSE,
  SEND_MESSAGE,
  TOGGLE_CHECK,
  TOGGLE_SELECT_ALL
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
        if(parseInt(msg.id, 10) !== parseInt(action.id, 10)) return msg
        else if (!msg.selected) {
          return { ...msg, selected: true }
        } else return { ...msg, selected: false }
      })
    case TOGGLE_SELECT_ALL: 
      if(action.allSelected === true) {
        console.log('all selerd')
        return state.map(msg => ({
          ...msg,
          selected: false
        }))
      }
      else{
        return state.map(msg => ({
          ...msg,
          selected: true
        }))
      }
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
