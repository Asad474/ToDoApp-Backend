const Task = require('../models/taskmodel');

const apiroutes = (req, res) => {
    return res.status(200).json([
        'POST /api/login',
        'POST /api/register',
        'GET /api/tasks',
        'POST /api/tasks',
        'GET /api/task/:id',
        'PUT /api/task/:id',
        'DELETE /api/task/:id'
    ]);
}

const taskdetails = async(req, res) => {
    try{
        const tasks = await Task.find({user: req.user.id});
        if (tasks){
            return res.status(200).json(tasks);
        }    

        return res.status(200).json('This user has no task.');

    } catch(err){
        console.log(err);
        res.status(500).json('Internal Server Error.');
    }
}


const postTask = async(req, res) => {
    try{
        const {task, completed} = req.body;

        if (!task){
            return res.status(400).json('Task detail is required.');
        }

        const createTask = await Task.create({
            user: req.user.id,
            task,
            completed
        });

        return res.status(201).json(createTask);
    } catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error.');
    }
}


const getTask = async(req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if (!task){
            return res.status(400).json('Task does not exists.')
        }

        if (task.user.toString() !== req.user.id){
            return res.status(401).json('User unauthorized.');
        }

        return res.status(200).json(task);
    } catch(err){
        console.log(err);
        res.status(500).json('Internal Server Error.');
    }
}


const updateTask = async(req, res) => {
    try{
        const task =  await Task.findById(req.params.id);

        if (!task){
            return res.status(400).json('Task does not exists.')
        }

        if (task.user.toString() !== req.user.id){
            return res.status(401).json('User unauthorized.');
        }

        const updatedTask = await Task.findByIdAndUpdate(task.id, req.body, {new: true});
        return res.status(200).json(updatedTask);


    } catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error.');
    }
}


const deleteTask = async(req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if (!task){
            return res.status(400).json('Task does not exists.')
        }

        if (task.user.toString() !== req.user.id){
            return res.status(401).json('User unauthorized.');
        }

        const deleted_object = {_id: task.id};
        await Task.deleteOne(deleted_object);
        return res.status(200).json(deleted_object);
    } catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error.');
    }
}


module.exports = {
    apiroutes,
    taskdetails,
    postTask,
    getTask,
    updateTask,
    deleteTask,
}