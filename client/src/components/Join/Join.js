import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleNameChange = e => { setName(e.target.value); }
  const handleRoomChange = e => { setRoom(e.target.value); }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join </h1>
        <div> <input placeholder="Name" className="joinInput" type="text" onChange={handleNameChange} /> </div>
        <div> <input placeholder="Room" className="joinInput mt-20" type="text" onChange={handleRoomChange} /> </div>
        <Link
          onClick={e => (!name || !room) ? e.preventDefault() : null}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">Log In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join;