import React from 'react';

import './RoomUsersDiv.css';

const RoomUsersDiv = ({ users, name }) => {
  const namesArr = users.map(user => user.name).filter(userName => userName !== name);
  const isOtherUsersInRoom = namesArr.length >= 1;

  return (
    <div className="chat-room-users">
      {
        isOtherUsersInRoom &&
        (<>
          <h4>Room Members:</h4>
          <ul className='chat-room-users-list'>
            {
              namesArr.map(userName => (<li key={userName}>{userName}</li>))
            }
          </ul>
        </>)
      }
    </div>
  );
}

export default RoomUsersDiv;