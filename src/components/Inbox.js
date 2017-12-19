import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import Compose from './Compose'
import { 
  fetchMessages,
  toggleCompose,
  sendMessage,
  toggleCheck,
  handleCheckAll,
  handleStar,
  markRead,
  markUnread,
  deleteMessages
} from '../actions/index';

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

  componentDidMount() {
    this.props.fetchMessages()
  }

  allAreChecked = () => this.props.messages
    .every(message => message.selected === true)

  someAreChecked = () => this.props.messages
    .some(message => message.selected === true)

  noneAreChecked = () => !this.someAreChecked()

  handleCheck = (e) => {
    let messageId = e.target.id.split('-')[1]
    this.props.toggleCheck(messageId)
  }
  
  handleSelectAll = () => {
    if(this.allAreChecked()) {
      this.props.handleCheckAll(true)
    } else {
      this.props.handleCheckAll(false)
    }
  }

  handleStar(e) {
    let messageId = e.target.id.split('-')[1]
    let starred = this.props.messages.filter(msg => msg.id == messageId).starred

    this.props.handleStar(messageId, starred)
  }

  handleMarkRead () {
    let messageIds = this.props.messages
      .filter(message=> message.selected)
      .map(message => message.id)
    this.props.markRead(messageIds)
  }

  handleMarkUnread () {
    let messageIds = this.props.messages
      .filter(message => message.selected)
      .map(message => message.id)
    this.props.markUnread(messageIds)
  }

  handleDelete () {
    let messageIds = this.props.messages
      .filter(message => message.selected)
      .map(message => message.id)
    this.props.deleteMessages(messageIds)
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
    this.props.toggleCompose()
  }

  async onSend (e) {
    e.preventDefault()
    const subject = e.target.querySelector('input').value
    const message = e.target.querySelector('textarea').value
    const body = { subject, message }

    e.target.querySelector('input').value = ''
    e.target.querySelector('textarea').value = ''

    this.props.sendMessage(body)
  }

  render() {
    return (
      <div className="App">
        <Toolbar 
          messages={ this.props.messages }
          onSelectAll={ this.handleSelectAll }
          onMarkRead={ this.handleMarkRead }
          onMarkUnread={ this.handleMarkUnread }
          onDelete={ this.handleDelete }
          onAddLabel={ this.handleAddLabel }
          onRemoveLabel={ this.handleRemoveLabel }
          onCompose={ this.composeMessage }
        />
        { this.props.showCompose ? <Compose onSend={ this.onSend }/> : '' }
        <MessageList
          messages={ this.props.messages }
          onCheck={ this.handleCheck }
          onStar={this.handleStar} 
          onAddLabel={ this.handleAddLabel }
          onRemoveLabel={ this.handleRemoveLabel }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
  showCompose: state.showCompose
})

const mapDispatchToProps = dispatch => ({
  fetchMessages: () => {
    fetchMessages(dispatch)
  },
  toggleCompose: () => {
    toggleCompose()(dispatch)
  },
  sendMessage: (message) => {
    sendMessage(message)(dispatch)
  },
  toggleCheck: (id) => {
    toggleCheck(id)(dispatch)
  },
  handleCheckAll: (allSelected) => {
    handleCheckAll(allSelected)(dispatch)
  },
  handleStar: (id, starred) => {
    handleStar(id, starred)(dispatch)
  },
  markRead: (ids) => {
    markRead(ids)(dispatch)
  },
  markUnread: (ids) => {
    markUnread(ids)(dispatch)
  },
  deleteMessages: (ids) => {
    deleteMessages(ids)(dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
