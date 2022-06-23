const sequelize = require("../config/connection");
const seedTasks = require("./task-seeds");
const seedBoards = require("./board-seeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBoards();
  console.log("\n----------BOARDS SEEDED----------\n");

  await seedTasks();
  console.log("\n----------TASKS SEEDED----------\n");

  process.exit(0);
};

seedAll();
