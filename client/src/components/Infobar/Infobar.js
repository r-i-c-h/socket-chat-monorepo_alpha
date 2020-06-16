import React from 'react';

import './Infobar.css';

import closeIcon from '../../icons/closeIcon.png';
// import onlineIcon from '../../icons/onlineIcon.png';


const Infobar = ({ room, isConnected }) => {

  return (
    <header className="infoBar">
      <div className="leftInnerContainer">
        <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></div>
        <h3>Game Room: {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={closeIcon} alt="close chat" />
        </a>
      </div>
    </header>
  )
}

export default Infobar;