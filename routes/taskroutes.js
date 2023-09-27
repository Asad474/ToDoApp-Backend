const express = require('express');

const taskcontroller = require('../controllers/taskcontroller');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(auth, taskcontroller.taskdetails)
    .post(auth, taskcontroller.postTask);

router.route('/:id')
    .get(auth, taskcontroller.getTask)
    .put(auth, taskcontroller.updateTask)
    .delete(auth, taskcontroller.deleteTask);

module.exports = router;