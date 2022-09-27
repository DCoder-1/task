const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const user = require('./routes/userRoute');

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', user);

module.exports = app;
