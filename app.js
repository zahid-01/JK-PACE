const express = require('express');
const jsonParser = require('json-parser');
const userRouter = require('./Routes/userRouter');
const schemeRouter = require('./Routes/schemeRouter');
const distRouter = require('./Routes/districtRoutes');
const blockRouter = require('./Routes/blockRouter');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorcontroller = require('./Controller/errController');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/jkegov/scheme', schemeRouter);
app.use('/jkegov/user', userRouter);
app.use('/jkegov/districts', distRouter);
app.use('/jkegov/blocks', blockRouter);
app.use(errorcontroller);

module.exports = app;
