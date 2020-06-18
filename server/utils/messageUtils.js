function getTimeStr() {
  const currTime = new Date();
  const timeStr = currTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) // No seconds & am\pm
  // const timeStr = currTime.toLocaleString('en-US'); // <~~ Adds Date before time
  return timeStr.toLowerCase();
}

function formatChatMsg(user, text) {
  return {
    user,
    text,
    time: getTimeStr()
  }
}

function formatRoomData(roomName, roomUsersArray) {
  // { room: user.room, users: getUsersInRoom(user.roomID) }
  return {
    user: 'admin',
    room: roomName,
    users: roomUsersArray,
    time: getTimeStr()
  }
}


module.exports = { formatChatMsg, formatRoomData };