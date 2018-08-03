const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const actionRoute = require('./data/routes/actionRoute');
const projectRoute = require('./data/routes/projectRoute');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use('/actions, actionRoute');
server.use('/projects, projectRoute')

server.listen(8000, () => console.log('API is running on port 8000'));