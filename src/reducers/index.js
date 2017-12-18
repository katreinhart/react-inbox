import { combineReducers } from 'redux'

function messages(state = {}, action) {
  switch (action.type) {
    case 'MESSAGES_RECEIVED':
      console.log('received messages')
      return {
        ...state, 
        messages: action.messages
      }
  
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  messages: messages,

})

export default rootReducer
