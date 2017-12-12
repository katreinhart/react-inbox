import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }

  render() {
    return (
      <div>
        { this.props.messages.map(message => <Message 
            key={ message.id } 
            checked={ message.checked }
            starred={ message.starred }
            onCheck={ this.props.onCheck }
            onStar={ this.props.onStar }
            message={ message } 
          />)}
      </div>
    )
  }
}

export default MessageList
