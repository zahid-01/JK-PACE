const express = require("express");
const jsonParser = require("json-parser");
const userRouter = require("./Routes/userRouter");
const schemeRouter = require("./Routes/schemeRouter");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const errorcontroller = require("./Controller/errController");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/jkegov/scheme", schemeRouter);
app.use("/jkegov/user", userRouter);
app.use(errorcontroller);

module.exports = app;
