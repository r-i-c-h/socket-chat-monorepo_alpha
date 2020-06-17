import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Welcome.css';

const Welcome = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleNameChange = e => { setName(e.target.value); }
  const handleRoomChange = e => { setRoom(e.target.value); }

  return (
    <div className="welcome-container">
      <div className="welcome-container-interior">
        <h1 className="heading">Welcome </h1>
        <form>
          <label htmlFor="name">Name:
            <input placeholder="Your Name" className="welcomeInput" type="text" required={true} onChange={handleNameChange} id="name" />
          </label>
          <label htmlFor="room">Room:
            <input placeholder="What Room?" className="welcomeInput" type="text" required={true} onChange={handleRoomChange} id="room" />
          </label>
          <Link
            onClick={(e) => (!name || !room) ? e.preventDefault() : null}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className="button" type="submit">Log In</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Welcome;