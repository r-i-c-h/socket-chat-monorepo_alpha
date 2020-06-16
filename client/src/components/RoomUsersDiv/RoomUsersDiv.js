import React from 'react';

import './RoomUsersDiv.css';

const RoomUsersDiv = ({ userNames }) => {
  return (
    <div className="chat-room-users">
      <ul>
        {
          userNames.map(userName => (<li key={userName}>{userName}</li>))
        }
      </ul>
    </div>
  )
}

export default RoomUsersDiv;