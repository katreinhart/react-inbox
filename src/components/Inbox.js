import React, { Component } from 'react';

import Toolbar from './Toolbar'
import MessageList from './MessageList'

class Inbox extends Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
    this.handleStar = this.handleStar.bind(this)
    this.handleMarkRead = this.handleMarkRead.bind(this)
    this.handleMarkUnread = this.handleMarkUnread.bind(this)
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
    let [thisMsg] = nextState.messages.filter(message => message.id == messageId)
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
    let [thisMsg] = this.state.messages.filter(message => message.id == messageId)
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

  handleDelete = () => {
    let nextState = Object.assign({}, this.state) 
    let remainingMessages = nextState.messages.filter(message=> !message.selected)
    this.setState({ 
      messages: [...remainingMessages]
    })
  }

  handleAddLabel = (e) => {
    let label = e.target.value
    e.target.selectedIndex = 0
    let nextState = Object.assign({}, this.state) 
    let checkedMessages = nextState.messages.filter(message=> message.selected)
    checkedMessages.forEach(message => {
      if(!message.labels.includes(label))
        message.labels.push(label)
    })
    this.setState({ 
      messages: [...nextState.messages]
    })
  }

  handleRemoveLabel = (e) => {
    let labelToRemove = e.target.value
    e.target.selectedIndex = 0
    let nextState = Object.assign({}, this.state) 
    let checkedMessages = nextState.messages.filter(message=> message.selected)
    checkedMessages.forEach(message => message.labels = message.labels.filter(label => label !== labelToRemove))
    this.setState({ 
      messages: [...nextState.messages]
    })
  }

  composeMessage () {
    console.log('compose message')
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
        <MessageList
          messages={ this.state.messages }
          onCheck={ this.handleCheck }
          onStar={this.handleStar} 
        />
      </div>
    );
  }
}

export default Inbox;
