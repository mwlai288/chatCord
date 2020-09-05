import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import Messages from './Messages';
import ChatInfo from './ChatInfo';
import ScrollToBottom from 'react-scroll-to-bottom';
import {
	AiFillGift,
	AiFillPushpin,
	AiFillQuestionCircle,
	AiOutlineSearch,
} from 'react-icons/ai';
import { MdInsertEmoticon, MdGif } from 'react-icons/md';
import { FaMicrophone, FaBell, FaUserFriends } from 'react-icons/fa';
import { FiAtSign } from 'react-icons/fi';

let socket;
const Chat = ({ location }) => {
	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();

	recognition.continous = true;
	recognition.interimResults = true;
	recognition.lang = 'en-US';

	const endpoint = 'https://socketio-app-react.herokuapp.com/';
	const [room, setRoom] = useState('');
	const [rooms, setRooms] = useState([
		'server 1',
		'server 2',
		'server 3',
		'server 4',
		'server 5',
	]);
	const [users, setUser] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const inputRef = useRef(null);

	const onChange = e => {
		setMessage(e.target.value);
	};

	useEffect(() => {
		const { username, room } = queryString.parse(location.search, {
			ignoreQueryPrefix: true,
		});

		socket = io(endpoint);

		// Join Chatroom
		socket.emit('joinRoom', { username, room });

		// Get room and users
		socket.on('roomUsers', ({ room, users }) => {
			setRoom(room);
			setUser(users);
		});

		socket.on('join', message => console.log(message));
	}, [endpoint, location.search]);

	useEffect(() => {
		socket.on('message', message => {
			setMessages(messages => [...messages, message]);
		});
	}, []);

	const handleListen = e => {
		recognition.start();
		recognition.onresult = event => {
			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				setMessage(transcript);
			}
		};
	};

	const send = e => {
		e.preventDefault();
		if (message === '') {
			return;
		} else {
			setMessage(e.target.value);
			inputRef.current.focus();
			// Emit message to server
			socket.emit('chatMessage', message);
			inputRef.current.value = '';
			inputRef.current.focus();
			setMessage('');
		}
	};

	const addRoom = () => {
		setRooms([...rooms, `Server ${rooms.length + 1}`]);
	};

	return (
		<div className="chat-container">
			<main className="chat-window">
				<div className="chat-window__header">
					<span className=" chat-window__header--left"># General</span>
					<span className="chat-window__header--right">
						<FaBell />
						<AiFillPushpin />
						<FaUserFriends />
						<input type="text" placeholder="Search" className="chat-input" />
						<AiOutlineSearch className="react-icon-search" />
						<FiAtSign />
						<AiFillQuestionCircle />
					</span>
				</div>
				<ScrollToBottom className="chat-window__messages">
					<Messages messages={messages} />
				</ScrollToBottom>
				<form className="chat-window__chat-form" onSubmit={send}>
					<input
						type="text"
						name="message"
						className="input"
						placeholder={`Message #${room}`}
						value={message}
						onChange={onChange}
						ref={inputRef}
					/>
					<div className="chat-window__icons">
						<FaMicrophone
							className="react-icon-microphone"
							onClick={handleListen}
						/>
						<AiFillGift className="react-icon-gift" />
						<MdGif className="react-icon-gif" />
						<MdInsertEmoticon className="react-icon-smiley" />
					</div>
				</form>
			</main>
			<ChatInfo room={room} users={users} rooms={rooms} addRoom={addRoom} />
		</div>
	);
};

export default Chat;
