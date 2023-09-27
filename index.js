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

app.use('/api/user', userroutes);
app.use('/api/tasks', taskroutes);
app.use('/api/refresh', refreshtokenroutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening at port ${port}.`); 
});