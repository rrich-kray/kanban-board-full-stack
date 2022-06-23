const Task = require("../models/Task");
const router = require("express").Router();

// Get all tasks
router.get("/kanban-board-full-stack/api/tasks", async (req, res) => {
  await Task.findAll()
    .then((taskData) => {
      // retreiving data from model
      console.log(taskData);
      res.json(taskData);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Create a task
router.post("/kanban-board-full-stack/api/tasks", async (req, res) => {
  await Task.create(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Update a task
router.put("/kanban-board-full-stack/api/tasks", async (req, res) => {
  await Task.update(req.body, {
    where: {
      id: req.body.task_id,
    },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Delete a task
router.delete("/kanban-board-full-stack/api/tasks", async (req, res) => {
  console.log(req.body.task_id);
  await Task.destroy({
    where: {
      id: req.body.task_id,
    },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
