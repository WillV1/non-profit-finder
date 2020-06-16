const express = require('express');
const consign = require('consign');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('./public'));

consign()
  .include("routes")
  .into(app);




app.listen(PORT, () => {
    console.log('App started on port 8080')
})