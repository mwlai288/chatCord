const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(cors());

// Import helper functions
const {
	userJoin,
	removeUser,
	usersInRoom,
	getUser,
} = require('./sockethelpers/users');

const formatMessage = require('./sockethelpers/messages');
const botName = `D'accordBot`;

io.on('connection', socket => {
	socket.on('joinRoom', ({ username, room }) => {
		const user = userJoin(socket.id, username, room);

		socket.join(user.room);

		// Welcome current user
		socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

		// Broadcast when a user connects
		socket.broadcast
			.to(user.room)
			.emit(
				'message',
				formatMessage(botName, `${user.username} has joined the chat`)
			);

		// Send users and room info
		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: usersInRoom(user.room),
		});
	});

	// Listen for chatMessage
	socket.on('chatMessage', msg => {
		const user = getUser(socket.id);

		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});

	// Runs when use disconnects
	socket.on('disconnect', () => {
		const user = removeUser(socket.id);
		if (user) {
			io.emit(
				'message',
				formatMessage(botName, `${user.username} has left the chat`)
			);
			// Send users and room info
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: usersInRoom(user.room),
			});
		}
	});
});

server.listen(process.env.PORT || 5000, () => {
	console.log(`Listening on port 5000`);
});
