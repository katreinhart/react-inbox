import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED, TOGGLE_COMPOSE } from '../actions'


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

function toggleCompose (state = initialState, action ) {
  switch(action.type) {
    case TOGGLE_COMPOSE:
      return {
        showCompose: !state.showCompose
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  messages: messages,
  showCompose: toggleCompose,
})

export default rootReducer
