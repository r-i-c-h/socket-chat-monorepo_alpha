import React from 'react';

import './Infobar.css';

import closeIcon from '../../icons/closeIcon.png';

const StatusCircle = (status) => {
  return (
    <svg
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      className='status-dot'
      fill={status ? "var(--clr-green)" : "var(--clr-red)"}
    >
      <circle cx="5" cy="5" r="5" />
    </svg>
  )
}
const Infobar = ({ room, isConnected }) => {

  return (
    <header className="infoBar">
      <div className="leftInnerContainer">
        <StatusCircle status={isConnected} />
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