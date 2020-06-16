const express = require('express');
const consign = require('consign');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + '/public'));

consign()
  .include("routes")
  .into(app);




app.listen(PORT, () => {
    console.log('App started on port 8080')
})