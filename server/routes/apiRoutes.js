const { Board } = require('../models/index');
const { Task } = require('../models/index');
const User = require('../models/User');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

// Get all tasks
router.get('/kanban-board-full-stack/api/tasks', async (req, res) => {
	await Task.findAll()
		.then((taskData) => {
			// retreiving data from model
			res.json(taskData);
		})
		.catch((err) => {
			res.json(err);
		});
});

// Get boards by user
router.get('/kanban-board-full-stack/api/user', async (req, res) => {
	await Board.findAll({
		where: {
			user_id: req.body.id,
		},
		include: [
			{
				model: Task,
			},
		],
	})
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

// Get boards
router.get('/kanban-board-full-stack/api/boards', async (req, res) => {
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
router.post('/kanban-board-full-stack/api/tasks', async (req, res) => {
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
router.post('/kanban-board-full-stack/api/boards', async (req, res) => {
	await Board.create(req.body)
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Update a task
router.put('/kanban-board-full-stack/api/tasks', async (req, res) => {
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
router.delete('/kanban-board-full-stack/api/tasks', async (req, res) => {
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

// Delete a board
router.delete('/kanban-board-full-stack/api/boards', async (req, res) => {
	await Task.destroy({
		where: {
			board_id: req.body.id,
		},
	});

	await Board.destroy({
		where: {
			id: req.body.id,
		},
	})
		.then((boardData) => {
			res.json(boardData);
		})
		.catch((err) => {
			res.json(err);
		});
});

// Register
router.post('/kanban-board-full-stack/register', async (req, res) => {
	if (
		User.findOne({
			where: {
				email: req.body.email,
			},
		})
	) {
		res.json(
			'A user is already registered with that email address. Please choose another.'
		);
	}
	await User.create(req.body)
		.then((userData) => {
			const token = jwt.sign(
				{ data: [userData.email, userData.password] },
				secret,
				{ expiresIn: '2h' }
			);
			res.json([userData, token]);
		})
		.catch((err) => res.json(err));
});

// Login
router.post('/kanban-board-full-stack/login', async (req, res) => {
	await User.findOne({
		where: {
			id: req.body.id,
			password: req.body.password,
		},
	})
		.then((userData) => {
			res.json(userData);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;
