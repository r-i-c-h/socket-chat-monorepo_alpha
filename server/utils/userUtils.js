let usersStore = [];
const addUser = ({ id, name, room }) => {
  const roomID = room.trim().toLowerCase().replace(' ', '');
  const canonicalName = name.trim().toLowerCase().replace(' ', '');
  const isHost = getUsersInRoom(roomID).length === 0;
  if (!roomID || !canonicalName) return { error: 'Username + Room are BOTH required.' };

  const user = { id, roomID, name, room, isHost, canonicalName, score: 0 }
  const isNameTaken = usersStore.find(existing => existing.roomID === roomID && existing.canonicalName === user.canonicalName);
  if (isNameTaken) {
    return { error: `A User with the name ${user.name} already exists in room ${user.room}`, user: null };
  }

  usersStore.push(user);
  return { error: false, user };
}

const removeUser = (id) => {
  const indx = usersStore.findIndex(eachUser => eachUser.id === id);
  if (indx !== -1) {
    return usersStore.splice(indx, 1); //! (returns the found user object) -> MUTATES usersStore!!!
  }

  return { error: `No User with ID ${id} found in userStore` }
}

const getUser = (id) => usersStore.find(user => user.id === id);

const getUsersInRoom = (roomID) => usersStore.filter(user => user.roomID === roomID);

const getUserNamesInRoom = (roomID) => getUsersInRoom(roomID).map(eachUser => eachUser.name);

// const getWholeUsersStore = () => usersStore.slice();

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getUserNamesInRoom };