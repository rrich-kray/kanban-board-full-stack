const sequelize = require("../config/connection");
const seedTasks = require("./task-seeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedTasks();
  console.log("\n----------TASKS SEEDED----------\n");

  process.exit(0);
};

seedAll();
