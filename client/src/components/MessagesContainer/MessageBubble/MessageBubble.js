import React from 'react';

import './MessageBubble.css';

const MessageBubble = ({ msg: { user, text, time }, isFromSelf }) => {

  const appendedClass = isFromSelf ? 'self-chat' : user === 'System' ? 'system-chat' : 'new-chat';

  const makeChatAuthorLine = (user, isFromSelf) => {
    if (isFromSelf) {
      return (<>
        <span className="chat-meta-username">&#40;You&nbsp;at&nbsp;</span>
        <span className="chat-meta-time">{time}&#41;</span>
      </>)
    }
    return (<>
      <span className="chat-meta-username">{user}&nbsp;at&nbsp;</span>
      <span className="chat-meta-time">{time}</span>
    </>)
  }

  return (
    <div
      className={`chat-message ${appendedClass}`}
    >
      <div className="chat-meta">
        {makeChatAuthorLine(user, isFromSelf)}
      </div>
      <p className="chat-text">{(text)}</p>
    </div>
  )
}

export default MessageBubble;