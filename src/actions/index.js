
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
  return async function(dispatch) {
    const response = await fetch(`http://localhost:8082/api/messages`)
    const json = await response.json()
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    })
  }
}

export const TOGGLE_COMPOSE = 'TOGGLE_COMPOSE'
export function toggleCompose() {
  return function(dispatch) {
    dispatch({ 
      type: TOGGLE_COMPOSE
    })
  }
}

export const SEND_MESSAGE = 'SEND_MESSAGE'
export function sendMessage(body) {
  return async function(dispatch) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const newMessage = await response.json()
    dispatch({
      type: SEND_MESSAGE,
      message: newMessage
    })
    dispatch({
      type: TOGGLE_COMPOSE
    })
  }
}

export const TOGGLE_CHECK = 'TOGGLE_CHECK'
export function toggleCheck(id) {
  return function(dispatch) {
    dispatch({ 
      type: TOGGLE_CHECK,
      id
    })
  }
}