
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

export const TOGGLE_SELECT_ALL = 'TOGGLE_SELECT_ALL'
export function handleCheckAll (allSelected) {
  return function(dispatch) {
    dispatch({ 
      type: TOGGLE_SELECT_ALL,
      allSelected
    })
  }
}

export const TOGGLE_STAR = 'TOGGLE_STAR'
export function handleStar(id, starred) {
  return async function(dispatch) {
    const messageBody = {
      "messageIds": [ id ],
      "command": "star",
      "star": starred
    }

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    dispatch({
      type: TOGGLE_STAR,
      id
    })
  }
}

export const MARK_READ = 'MARK_READ'
export function markRead(ids) {
  return async function(dispatch) {
    const messageBody = {
      "messageIds": ids,
      "command": "read",
      "read": true
    }

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: MARK_READ,
      ids
    })
  }
}

export const MARK_UNREAD = 'MARK_UNREAD'
export function markUnread(ids) {
  return async function(dispatch) {
    const messageBody = {
      "messageIds": ids,
      "command": "read",
      "read": false
    }

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: MARK_UNREAD,
      ids
    })
  }
}

export const DELETE_MESSAGES = 'DELETE_MESSAGES'
export function deleteMessages(ids) {
  return async function(dispatch) {
    const messageBody = {
      "messageIds": ids,
      "command": "delete"
    }
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    dispatch({
      type: DELETE_MESSAGES,
      ids
    })
  }
}

export const ADD_LABEL = 'ADD_LABEL'
export function addLabel(ids, label) {
  return async function(dispatch) {
    let messageBody = {
      "messageIds": [],
      "command": "addLabel",
      "label": label
    }

    await fetch (`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: 'ADD_LABEL',
      ids,
      label
    })
  }
}

export const REMOVE_LABEL = 'REMOVE_LABEL'
export function removeLabel(ids, label) {
  return async function(dispatch) {
    let messageBody = {
      "messageIds": [],
      "command": "addLabel",
      "label": label
    }
  
    await fetch (`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  
    dispatch({
      type: 'REMOVE_LABEL',
      ids,
      label
    })
  }
}