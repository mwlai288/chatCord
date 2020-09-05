import React, { useRef, useState } from 'react';

const inputRef = useRef(null);

const Input = props => {
	const [message, setMessage] = useState('');

	const onChange = e => setMessage(e.target.value);

	const send = e => {
		e.preventDefault();
		setMessage(e.target.value);
		// Emit message to server
		socket.emit('chatMessage', message);
		inputRef.current.value = '';
		inputRef.current.focus();
	};

	const { room } = props;
	return (
		<form className="chat-window__chat-form" onSubmit={send}>
			<input
				type="text"
				name="message"
				className="input"
				placeholder={`Message #${room}`}
				onChange={onChange}
				ref={inputRef}
			/>
			<button type="submit" className="chat-form__button">
				Send
			</button>
		</form>
	);
};

export default Input;
