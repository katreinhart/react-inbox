import React from 'react'
import Message from './Message'

const MessageList = ({ messages, onCheck, onStar }) => (
  <div>
    { messages.map(message => <Message 
        key={ message.id } 
        selected={ message.selected }
        starred={ message.starred }
        onCheck={ onCheck }
        onStar={ onStar }
        message={ message } 
      />)}
  </div>
)

export default MessageList
