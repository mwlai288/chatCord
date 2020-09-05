import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import JoinRoom from './components/JoinRoom';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={JoinRoom} />
				<Route exact path="/chat" component={Chat} />
			</Switch>
		</Router>
	);
};

export default App;
