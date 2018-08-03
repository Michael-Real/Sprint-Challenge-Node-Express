const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const actionRoute = require('./data/routes/actions');
const projectRoute = require('./data/routes/project');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use('/actions, actions');
server.use('/projects, project')

server.listen(8000, () => console.log('API is running on port 8000'));