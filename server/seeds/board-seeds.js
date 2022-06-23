const Board = require("../models/Board");

const boardData = [
  {
    name: "Kanban Board",
  },
  {
    name: "Space Exploration Website",
  },
  {
    name: "Interactive Comments Section",
  },
  {
    name: "MERN Social Media App",
  },
  {
    name: "MERN Blog",
  },
];

const seedBoards = () => Board.bulkCreate(boardData);

module.exports = seedBoards;
