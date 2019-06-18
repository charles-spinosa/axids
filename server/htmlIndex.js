const express = require('express');
const parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const apiRouter = require('./apiRouter');

const htmlServer = express();

htmlServer.use(parser.json());
htmlServer.use(parser.urlencoded({ extended: true }));
htmlServer.use(morgan('dev'));

htmlServer.use('/', express.static(path.join(__dirname, '../client/dist')));
htmlServer.use('/api', apiRouter);

const port = process.env.PORT || 3000;

htmlServer.listen(port, () =>
  console.log(`Server is listening on port: ${port}!`)
);
