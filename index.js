const express = require('express');
const cors = require('cors');

const connDB = require('./config/db');
const userroutes = require('./routes/userroutes');
const taskroutes = require('./routes/taskroutes');
const refreshtokenroutes = require('./routes/refreshtokenroutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();

connDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT || 8080;

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
    res.status(200).json({
        'POST /api/user/login': 'Used for user login.',
        'POST /api/user/register': 'Used for user registration.',
        'POST /api/refresh': 'Used for refreshing access tokens.',
        'DELETE /api/refresh': 'Used for revoking refresh tokens.',
        'GET /api/tasks': 'Used to retrieve all tasks.',
        'POST /api/tasks': 'Used to create a new task.',
        'GET /api/tasks/:id': 'Used to retrieve a specific task by ID.',
        'PUT /api/tasks/:id': 'Used to update a specific task by ID.',
        'DELETE /api/tasks/:id': 'Used to delete a specific task by ID.',
    });
});

app.use('/api/user', userroutes);
app.use('/api/tasks', taskroutes);
app.use('/api/refresh', refreshtokenroutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening at port ${port}.`); 
});