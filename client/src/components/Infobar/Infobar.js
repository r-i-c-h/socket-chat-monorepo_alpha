import React from 'react';

import './Infobar.css';

const CloseIcon = () => (
  <svg
    className="close-icon"
    viewBox="0 0 10 10"
    xmlns="http://www.w3.org/2000/svg"
    stroke="black"
    strokeWidth="4px"
  >
    <path d="M0 0 L10 10 M0 10 L10 0 Z" />
  </svg>
)

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
          <CloseIcon />
        </a>
      </div>
    </header>
  )
}

export default Infobar;