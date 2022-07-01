import "./App.css";
import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import Sidebar from "./components/Sidebar/Sidebar";
import Nav from "./components/Nav/Nav";
import Modal from "./components/Modal/Modal";

function App() {
  const [boardData, setBoardData] = useState();
  const [activeBoardIndex, changeActiveBoardIndex] = useState(1);
  const [isModalVisible, changeModalVisibility] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/kanban-board-full-stack/api/boards", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
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
              boardData={boardData}
              activeBoardIndex={activeBoardIndex}
              changeActiveBoardIndex={changeActiveBoardIndex}
            />
          )}
          <div className="sidebar-container">
            <Sidebar
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
