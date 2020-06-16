import React, { useState, useRef } from 'react';
import { socket } from '../../utils/SocketConnection';

import './NewMessageInput.css';

const NewMessageInput = () => {
  const [outgoingMsg, setOutgoingMsg] = useState('');
  const inputRef = useRef(null); // for focusing the text box after sending a chat

  const emitNewChat = e => {
    e.preventDefault();
    if (outgoingMsg) {
      socket.emit('newChatMsg', { text: outgoingMsg });
      setOutgoingMsg('');
      inputRef.current.focus();
    }
  }

  return (
    <div className="chat-form-container">
      <form className="chat-input-form">
        <input
          ref={inputRef}
          type="text"
          id="chat-input-msg"
          placeholder="Message..."
          autoComplete="off"
          autoFocus={true}
          value={outgoingMsg}
          onChange={e => setOutgoingMsg(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? emitNewChat(e) : null}
        />
        <button
          className="chat-input-btn"
          type="button"
          onClick={e => { emitNewChat(e) }}
        >&raquo;</button>
      </form>
    </div>
  );
}

export default NewMessageInput;