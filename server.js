const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
var router = require('./controllers/webSearch')


const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use('/', router)



app.listen(PORT, () => {
  console.log('App started on port 8080')
})