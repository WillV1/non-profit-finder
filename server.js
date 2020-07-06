const express = require('express');
const path = require('path');
const axios = require("axios");
const cors = require("cors");
const bodyParser = require('body-parser');
var router = require('./controllers/webSearch')


const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.get('/', function (req, res) {

  axios({
      "method":"GET",
      "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
      "x-rapidapi-key":"d9822625a2msh4f7608dcb4681cbp1d805fjsn2e6e7ce7ee4b",
      "useQueryString":true
      },"params":{
      "autoCorrect":"true",
      "pageNumber":"1",
      "pageSize":"10",
      "q":req.body.name,
      "safeSearch":"false"
      }
      })
      .then((response)=>{
        res.json(response)
      })
      .catch((error)=>{
        console.log(error)
      })
  
  })


app.listen(PORT, () => {
  console.log('App started on port 8080')
})