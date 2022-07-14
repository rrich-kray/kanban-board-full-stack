import './App.css';
import React, { useState, useEffect } from 'react';
import Board from './components/Board/Board';
import Sidebar from './components/Sidebar/Sidebar';
import Nav from './components/Nav/Nav';
import Modal from './components/Modal/Modal';
import { BrowserRouter as Router, Routers, Link } from 'react-router-dom';

function App() {
	const [boardData, setBoardData] = useState();
	const [activeBoardIndex, changeActiveBoardIndex] = useState(1);
	const [isModalVisible, changeModalVisibility] = useState(false);

	const baseUrl =
		process.env.NODE_ENV === 'production'
			? 'https://kanban-board-full-stack.herokuapp.com'
			: 'http://localhost:3001';

	useEffect(() => {
		fetch(`${baseUrl}/kanban-board-full-stack/api/boards`, {
			method: 'GET',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
				setBoardData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			{boardData && (
				<div className="app">
					{isModalVisible && (
						<Modal
							baseUrl={baseUrl}
							boardData={boardData}
							activeBoardIndex={activeBoardIndex}
							changeActiveBoardIndex={changeActiveBoardIndex}
						/>
					)}
					<div className="sidebar-container">
						<Sidebar
							baseUrl={baseUrl}
							boardData={boardData}
							changeActiveBoardIndex={changeActiveBoardIndex}
						/>
					</div>
					<div className="board-container">
						<Nav
							activeBoardIndex={activeBoardIndex}
							isModalVisible={isModalVisible}
							changeModalVisibility={changeModalVisibility}
						/>
						<Board
							baseUrl={baseUrl}
							boardData={boardData.filter(
								(board) => board.id === activeBoardIndex
							)}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
