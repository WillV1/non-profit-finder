const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {

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

    module.exports = router;