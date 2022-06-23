const Board = require("./Board");
const Task = require("./Task");

Board.hasMany(Task, {
  foreignKey: "board_id",
});

Task.belongsTo(Board, {
  foreignKey: "board_id",
});

module.exports = { Board, Task };
