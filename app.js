const express = require('express');
const jsonParser = require('json-parser');
const userRouter = require('./Routes/userRouter');
const schemeRouter = require('./Routes/schemeRouter');
const distRouter = require('./Routes/districtRoutes');
const blockRouter = require('./Routes/blockRouter');
const villageRouter = require('./Routes/villageRouter');
const departmentRouter = require('./Routes/departmentRouter');
const messageRouter = require('./Routes/messageRouter');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorcontroller = require('./Controller/errController');
const cors = require('cors');
const path = require('path');
const xss = require('xss-clean');
const sanitize = require('express-mongo-sanitize');

const app = express();

app.use(xss());
app.use(sanitize());
app.use(express.static(path.join(__dirname, '/public')));

app.enable('trust proxy');
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'https://jkpace-poni.onrender.com',
      'https://jkpace.netlify.app',
      'https://radiant-torte-41dbd7.netlify.app',
      'https://duffersolutions.com/',
    ],
    credentials: true,
  })
);

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/jkegov/scheme', schemeRouter);
app.use('/jkegov/user', userRouter);
app.use('/jkegov/districts', distRouter);
app.use('/jkegov/blocks', blockRouter);
app.use('/jkegov/villages', villageRouter);
app.use('/jkegov/departments', departmentRouter);
app.use('/jkegov/messages', messageRouter);
app.use(errorcontroller);

module.exports = app;
