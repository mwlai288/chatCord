import React, { Fragment } from 'react';

import { BsPlus, BsChevronDown } from 'react-icons/bs';
import { GiSpeaker } from 'react-icons/gi';
import { FaHashtag } from 'react-icons/fa';

const ChatInfo = ({ users, room, rooms, addRoom }) => {
	return (
		<Fragment>
			<div className="side-info">
				<section className="side-info__room">
					<div className="side-info__room-name">{room}</div>
					{rooms.map((room, i) => (
						<div key={i} className="side-info__room-name">
							{room}
						</div>
					))}
					<BsPlus className="react-icon-plus" onClick={addRoom} />
				</section>
				<section className="side-info__user">
					<>
						{/* {users.length === 0
							? ''
							: users.map(user => ( */}
						<div className="side-info__user--heading">
							{/* {username} */}
							<BsChevronDown />
						</div>
						{/* ))} */}
					</>
					<section>
						<h3 className="side-info__channel-header">
							<BsChevronDown />
							<p>Text Channels</p>
						</h3>
						<div className="side-info__text-channel">
							<FaHashtag />
							<p>General</p>
						</div>
					</section>
					<section>
						<h3 className="side-info__channel-header">
							<BsChevronDown />
							<p>Voice Channels</p>
						</h3>
						<div className="side-info__voice-channel">
							<GiSpeaker /> <p>General</p>
						</div>
					</section>
				</section>
			</div>
		</Fragment>
	);
};

export default ChatInfo;
