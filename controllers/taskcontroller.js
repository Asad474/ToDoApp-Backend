const asyncHandler = require('express-async-handler');
const Task = require('../models/taskmodel');


const taskdetails = asyncHandler(async(req, res) => {
    const tasks = await Task.find({user: req.user.id});

    if (tasks){
        return res.status(200).json(tasks);
    };

    return res.status(200).json('This user has no task.');
});


const postTask = asyncHandler(async(req, res) => {
    const {task, completed} = req.body;

    if (!task){
        res.status(400);
        throw new Error('Task detail is required.');
    };

    const createTask = await Task.create({
        user: req.user.id,
        task,
        completed
    });

    return res.status(201).json(createTask);
});


const getTask = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task){
        res.status(400);
        throw new Error('Task does not exists.');
    };

    if (task.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User unauthorized.');
    };

    return res.status(200).json(task);
});


const updateTask = asyncHandler(async(req, res) => {
    const task =  await Task.findById(req.params.id);

    if (!task){
        res.status(400);
        throw new Error('Task does not exists.');
    };

    if (task.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User unauthorized.');
    };

    const updatedTask = await Task.findByIdAndUpdate(task.id, req.body, {new: true});

    return res.status(200).json(updatedTask);
});


const deleteTask = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task){
        res.status(400);
        throw new Error('Task does not exists.');
    };

    if (task.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User unauthorized.');
    }

    const deleted_object = {_id: task.id};
    await Task.deleteOne(deleted_object);
    
    return res.status(200).json(deleted_object);
});


module.exports = {
    taskdetails,
    postTask,
    getTask,
    updateTask,
    deleteTask,
}