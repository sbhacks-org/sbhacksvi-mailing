require('dotenv').config();


const bodyParser = require('body-parser');
const express = require('express');
const http = require("http");
const models = require("./models");

const app = express();

const port = process.env.PORT || 8000; //use process.env.PORT for heroku

app.set('view engine', 'ejs');

app.use(express.static('./assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./controller')(app);

models.sequelize.sync().then(function() {
  http.createServer(app).listen(port, () => {
    console.log('Server listening on port ' + port);
  });
});