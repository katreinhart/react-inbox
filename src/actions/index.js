
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
