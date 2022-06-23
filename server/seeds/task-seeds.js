const Task = require("../models/Task");

const taskData = [
  {
    title: "Kanban Board Full Stack",
    description: "Implement backend for Kanban Board app",
    progress: 1,
  },
  {
    title: "Space Website (Frontend Mentor)",
    description: "Start on space challenge site",
    progress: 0,
  },
  {
    title: "MERN Social Media App",
    description:
      "Create a fully-fledged social media application. Emulate Twitter. Users can post, delete posts, like other posts, follow users",
    progress: 2,
  },
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;
