import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import MessageBubble from './MessageBubble/MessageBubble';

import './MessagesContainer.css';

const MessagesContainer = ({ messages, name }) => {
  return (
    <ScrollToBottom className="chat-messages-scroll-box" followButtonClassName="scroll-to-bottom-button">
      <ul className="chat-messages-list">
        {
          messages.map((eachMsg, i) => {
            const { user, time } = eachMsg;
            return <MessageBubble msg={eachMsg} isFromSelf={user === name} key={user.concat(i, time)} />
          })
        }
      </ul>
    </ScrollToBottom>
  )
}

export default MessagesContainer;