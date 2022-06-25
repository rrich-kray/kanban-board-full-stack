const { Board } = require("../models");
const { Task } = require("../models");
const router = require("express").Router();

// Get all tasks
router.get("/kanban-board-full-stack/api/tasks", async (req, res) => {
  await Task.findAll()
    .then((taskData) => {
      // retreiving data from model
      res.json(taskData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/kanban-board-full-stack/api/boards", async (req, res) => {
  await Board.findAll({
    include: [
      {
        model: Task,
      },
    ],
  })
    .then((boardData) => {
      console.log(boardData);
      res.json(boardData);
    })
    .catch((error) => {
      res.json(error);
    });
});

// Create a task
router.post("/kanban-board-full-stack/api/tasks", async (req, res) => {
  console.log(req.body);
  await Task.create(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Create a board
router.post("/kanban-board-full-stack/api/boards", async (req, res) => {
  await Board.create(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
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
