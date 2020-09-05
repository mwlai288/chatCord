import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JoinRoom = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const enterRoom = e => {
		if (!name || !room) {
			e.preventDefault();
		}
	};

	return (
		<div className="join">
			<form className="join__form" onSubmit={enterRoom}>
				<p>Add username and Chat Room to continue</p>
				<input
					type="text"
					name="user-name"
					placeholder="Enter Username"
					className="join__form--user-name"
					onChange={event => setName(event.target.value)}
				/>
				<input
					type="text"
					name="room-name"
					placeholder="Enter Room"
					className="join__form--room-name"
					onChange={event => setRoom(event.target.value)}
				/>
				<Link to={`/chat?username=${name}&room=${room}`}>
					<input type="submit" value="Enter" className="join__form--button" />
				</Link>
			</form>
		</div>
	);
};

export default JoinRoom;
