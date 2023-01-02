const express = require('express');
const jsonParser = require('json-parser');
const userRouter = require('./Routes/userRouter');
const schemeRouter = require('./Routes/schemeRouter');
const distRouter = require('./Routes/districtRoutes');
const blockRouter = require('./Routes/blockRouter');
const villageRouter = require('./Routes/villageRouter');
const viewsRouter = require('./Routes/viewsRouter');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorcontroller = require('./Controller/errController');
const cors = require('cors');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/jkegov/scheme', schemeRouter);
app.use('/jkegov/user', userRouter);
app.use('/jkegov/districts', distRouter);
app.use('/jkegov/blocks', blockRouter);
app.use('/jkegov/villages', villageRouter);
app.use('/', viewsRouter);
app.use(errorcontroller);

module.exports = app;
