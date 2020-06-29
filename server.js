const express = require('express');
const path = require('path');
const cors = require("cors");


const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(cors());


const newsController = require("./controllers/news");
app.use(newsController);


app.listen(PORT, () => {
  console.log('App started on port 8080')
})