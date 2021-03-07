import React from 'react';
import './App.css';
import { Puzzle } from './components/Puzzle';
import logo from './img/logo.jpg';


const App = () => {
	return (
		<div className="App">
			<img className="mainLogo" src={logo} />
			<Puzzle />
		</div>
	);
};

export default App;
