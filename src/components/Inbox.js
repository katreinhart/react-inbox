import React, { Component } from 'react';

import Toolbar from './Toolbar'
import MessageList from './MessageList'
import Compose from './Compose'

class Inbox extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      showCompose: false
    }
    this.handleStar = this.handleStar.bind(this)
    this.handleMarkRead = this.handleMarkRead.bind(this)
    this.handleMarkUnread = this.handleMarkUnread.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddLabel = this.handleAddLabel.bind(this)
    this.handleRemoveLabel = this.handleRemoveLabel.bind(this)
    this.composeMessage = this.composeMessage.bind(this)
    this.onSend = this.onSend.bind(this)
  }

  async componentDidMount() {
    const result = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const { _embedded: { messages }} = await result.json()
    this.setState({ messages })
  }

  allAreChecked = () => this.state.messages
    .every(message => message.selected === true)

  someAreChecked = () => this.state.messages
    .some(message => message.selected === true)

  noneAreChecked = () => !this.someAreChecked()

  handleCheck = (e) => {
    let messageId = e.target.id.split('-')[1]
    let nextState = Object.assign({}, this.state)
    let [thisMsg] = nextState.messages.filter(message => parseInt(message.id, 10) === parseInt(messageId, 10))
    thisMsg.selected = thisMsg.selected ? false : true
    this.setState({
      messages: [
        ...nextState.messages
      ]
    })
  }
  
  handleSelectAll = () => {
    let nextState = Object.assign({}, this.state)
    let newStateMessages
    if(this.allAreChecked()) {
      newStateMessages = nextState.messages.map(message => {
        message.selected = false
        return message
      })
    } else {
      newStateMessages = nextState.messages.map(message => {
        message.selected = true
        return message
      })
    }
    this.setState({ 
      messages: [...newStateMessages]
    })
  }

  async handleStar(e) {
    let messageId = e.target.id.split('-')[1]
    let nextState = Object.assign({}, this.state)
    let [thisMsg] = this.state.messages.filter(message => parseInt(message.id, 10) === parseInt(messageId, 10))
    thisMsg.starred = thisMsg.starred ? false : true

    const messageBody = {
      "messageIds": [ thisMsg.id ],
      "command": "star",
      "star": thisMsg.starred
    }

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState({
      messages: [
        ...nextState.messages
      ]
    })
  }

  async handleMarkRead () {
    let nextState = Object.assign({}, this.state) 
    let checkedMessages = nextState.messages.filter(message=> message.selected)
    
    const messageBody = {
      "messageIds": [],
      "command": "read",
      "read": true
    }
    
    checkedMessages.forEach(message => {
      messageBody.messageIds.push(message.id)
      message.read = true
    })

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState({ 
      messages: [...nextState.messages]
    })
  }

  async handleMarkUnread () {
    let nextState = Object.assign({}, this.state) 
    let checkedMessages = nextState.messages.filter(message=> message.selected)

    const messageBody = {
      "messageIds": [],
      "command": "read",
      "read": false
    }

    checkedMessages.forEach(message => {
      messageBody.messageIds.push(message.id)
      message.read = false
    })

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState({ 
      messages: [...nextState.messages]
    })
  }

  async handleDelete () {
    let nextState = Object.assign({}, this.state) 
    let remainingMessages = nextState.messages.filter(message=> !message.selected)

    const messageBody = {
      "messageIds": [],
      "command": "delete"
    }

    nextState.messages.forEach(message => {
      if(message.selected) messageBody.messageIds.push(message.id)
    })

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState({ 
      messages: [...remainingMessages]
    })
  }

  async handleAddLabel(e) {
    let label = e.target.value
    e.target.selectedIndex = 0
    let nextState = Object.assign({}, this.state) 
    let checkedMessages = nextState.messages.filter(message=> message.selected)
    console.log(checkedMessages)

    let messageBody = {
      "messageIds": [],
      "command": "addLabel",
      "label": label
    }

    checkedMessages.forEach(message => {
      if(!message.labels.includes(label)){
        messageBody.messageIds.push(message.id)
        message.labels.push(label)
      }
    })

    await fetch (`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState({ 
      messages: [...nextState.messages]
    })
  }

  async handleRemoveLabel(e) {
    let labelToRemove = e.target.value
    e.target.selectedIndex = 0
    let nextState = Object.assign({}, this.state) 
    let checkedMessages = nextState.messages.filter(message=> message.selected)

    let messageBody = {
      "messageIds": [],
      "command": "addLabel",
      "label": labelToRemove
    }

    checkedMessages.forEach(message => {
      message.labels = message.labels.filter(label => label !== labelToRemove)
      messageBody.messageIds.push(message.id)
    })

    await fetch (`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(messageBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState({ 
      messages: [...nextState.messages]
    })
  }

  composeMessage (e) {
    e.preventDefault()
    this.setState({ 
      showCompose: !this.state.showCompose
    })
  }

  async onSend (e) {
    e.preventDefault()
    const subject = e.target.querySelector('input').value
    const message = e.target.querySelector('textarea').value

    e.target.querySelector('input').value = ''
    e.target.querySelector('textarea').value = ''

    const body = { subject, message }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const newMessage = await response.json()

    this.setState({ 
      messages: [...this.state.messages, newMessage],
      showCompose: false
    })
  }

  render() {
    return (
      <div className="App">
        <Toolbar 
          messages={ this.state.messages }
          onSelectAll={ this.handleSelectAll }
          onMarkRead={ this.handleMarkRead }
          onMarkUnread={ this.handleMarkUnread }
          onDelete={ this.handleDelete }
          onAddLabel={ this.handleAddLabel }
          onRemoveLabel={ this.handleRemoveLabel }
          onCompose={ this.composeMessage }
        />
        { this.state.showCompose ? <Compose onSend={ this.onSend }/> : '' }
        <MessageList
          messages={ this.state.messages }
          onCheck={ this.handleCheck }
          onStar={this.handleStar} 
          onAddLabel={ this.handleAddLabel }
          onRemoveLabel={ this.handleRemoveLabel }
        />
      </div>
    );
  }
}

export default Inbox;
