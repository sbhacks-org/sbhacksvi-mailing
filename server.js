require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config');
const app = express();

const port = process.env.PORT || 8000; //use process.env.PORT for heroku

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

require('./controller')(app);

app.listen(port, () => {
	console.log('We are live on ' + port);
});