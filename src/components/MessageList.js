import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }

  handleCheck = (e) => {
    let messageId = e.target.id.split('-')[1]
    let prevStateMessages = this.state.messages
    let [thisMsg] = this.state.messages.filter(message => message.id == messageId)
    thisMsg.selected = thisMsg.selected ? false : true
    this.setState({
      messages: [
        ...prevStateMessages,
        thisMsg
      ]
    })
  }

  handleStar = (e) => {
    let messageId = e.target.id.split('-')[1]
    let prevStateMessages = this.state.messages
    let [thisMsg] = this.state.messages.filter(message => message.id == messageId)
    thisMsg.starred = thisMsg.starred ? false : true
    this.setState({
      messages: [
        ...prevStateMessages,
        thisMsg
      ]
    })
  }

  render() {
    return (
      <div>
        { this.props.messages.map(message => <Message 
            key={ message.id } 
            checked={ message.checked }
            starred={ message.starred }
            onCheck={ this.handleCheck }
            onStar={ this.handleStar }
            message={ message } 
          />)}
      </div>
    )
  }
}

export default MessageList
