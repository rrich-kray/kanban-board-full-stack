const Board = require("./Board");
const Task = require("./Task");

Board.hasMany(Task, {
  foreignKey: "board_id",
  onDelete: "CASCADE",
});

Task.belongsTo(Board, {
  foreignKey: "board_id",
  onDelete: "CASCADE",
});

module.exports = { Board, Task };
