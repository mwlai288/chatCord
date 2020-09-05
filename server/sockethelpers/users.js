const users = [];

// Join user to chat
function userJoin(id, username, room) {
	const user = { id, username, room };

	users.push(user);

	return user;
}

// User leaves chat
const removeUser = id => {
	const index = users.findIndex(user => user.id === id);
	if (index !== -1) return users.splice(index, 1)[0];
};

// Get Current User
const getUser = id => users.find(user => user.id === id);

// Get room users
const usersInRoom = room => users.filter(user => user.room === room);

module.exports = { userJoin, removeUser, getUser, usersInRoom };
