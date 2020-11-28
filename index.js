//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

app.listen(port, () => {
    console.log('Server running on port ' + port);
});