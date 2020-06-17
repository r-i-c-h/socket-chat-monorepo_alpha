import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import MessageBubble from './MessageBubble/MessageBubble';

import './MessagesContainer.css';

// Originally the chats were be placed in a UL w/display:flex\column\flex-start,
// and each chat would be an appended <li>
// But the ScrollToBottom container didn't like that, so now they're all <div>s
const MessagesContainer = ({ messages, name }) => {
  return (
    <ScrollToBottom
      className="chat-messages-scroll-box"
      followButtonClassName="scroll-to-bottom-button"
    >
      {
        messages.map((eachMsg, i) => {
          const { user, time } = eachMsg;
          return <MessageBubble msg={eachMsg} isFromSelf={user === name} key={user.concat(i, time)} />
        })
      }
    </ScrollToBottom>
  )
}

export default MessagesContainer;