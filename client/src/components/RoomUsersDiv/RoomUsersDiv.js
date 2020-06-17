import React from 'react';

import './RoomUsersDiv.css';

const RoomUsersDiv = ({ userNames }) => {
  return (
    <div className="chat-room-users">
      <h4>Room Members:</h4>
      <ul className='chat-room-users-list'>
        {
          userNames.map(userName => (<li key={userName}>{userName}</li>))
        }
      </ul>
    </div>
  )
}

export default RoomUsersDiv;