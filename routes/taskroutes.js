const express = require('express');
const router = express.Router();
const taskcontroller = require('../controllers/taskcontroller');
const auth = require('../middleware/authMiddleware');

router.get('/', taskcontroller.apiroutes);

router.route('/tasks')
    .get(auth, taskcontroller.taskdetails)
    .post(auth, taskcontroller.postTask);

router.route('/task/:id')
    .get(auth, taskcontroller.getTask)
    .put(auth, taskcontroller.updateTask)
    .delete(auth, taskcontroller.deleteTask);

module.exports = router;