import React, { Component } from 'react';

import Toolbar from './Toolbar'
import MessageList from './MessageList'

const seedMessages = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class Inbox extends Component {
  constructor() {
    super()
    this.state = {
      messages: seedMessages
    }
  }

  allAreChecked = () => this.state.messages
    .every(message => message.selected === true)

  someAreChecked = () => this.state.messages
    .some(message => message.selected === true)

  noneAreChecked = () => this.state.messages
    .none(message => message.selected === true)

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

  handleStar = (e) => {
    let messageId = e.target.id.split('-')[1]
    let nextState = Object.assign({}, this.state)
    let [thisMsg] = this.state.messages.filter(message => message.id == messageId)
    thisMsg.starred = thisMsg.starred ? false : true
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

  handleMarkRead = () => {
    let nextState = Object.assign({}, this.state) 
    let checkedMessages = nextState.messages.filter(message=> message.selected)
    checkedMessages.forEach(message => message.read = true)
    this.setState({ 
      messages: [...nextState.messages]
    })
  }

  handleMarkUnread = () => {
    let nextState = Object.assign({}, this.state) 
    let checkedMessages = nextState.messages.filter(message=> message.selected)
    checkedMessages.forEach(message => message.read = false)
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
