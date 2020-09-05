import React, { Fragment } from 'react';
import { GiSpeaker } from 'react-icons/gi';

const speech = new SpeechSynthesisUtterance();

const Messages = ({ messages }) => {
	return (
		<Fragment>
			{messages.map((msg, i) => (
				<div className="chat-message" key={i}>
					<p className="chat-message__meta">
						<span className="chat-message__meta--username">{msg.username}</span>{' '}
						<span className="chat-message__meta--time">{msg.time}</span>
					</p>
					<p className="chat-message__text">
						{msg.text}
						<GiSpeaker
							className="react-icon-speaker"
							onClick={() => {
								speech.text = msg.text;
								speechSynthesis.speak(speech);
							}}
						/>
					</p>
				</div>
			))}
		</Fragment>
	);
};

export default Messages;
