const express = require("express");
const jsonParser = require("json-parser");
const userRouter = require("./Routes/userRouter");
const schemeRouter = require("./Routes/schemeRouter");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/jkegov/user", userRouter);
app.use("/jkegov/scheme", schemeRouter);

module.exports = app;
