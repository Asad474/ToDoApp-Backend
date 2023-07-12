const express = require('express');
const connDB = require('./config/db');
const userroutes = require('./routes/userroutes');
const taskroutes = require('./routes/taskroutes');
const refreshtokenroutes = require('./routes/refreshtokenroutes');
require('dotenv').config();

connDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT || 8080;

app.use('/api', userroutes, taskroutes);
app.use('/api/refresh', refreshtokenroutes);

app.listen(port, () => {
    console.log(`Server is listening at port ${port}.`); 
});