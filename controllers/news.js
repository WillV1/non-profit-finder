const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a67400228579488db4aefbbbd0716576');
const express = require("express");
const router = express.Router();
// const readlineSync = require('readline-sync');

router.post("/newsapi", async (req, res) => {

    const result = await newsapi.v2.everything({
          q: "covid-19",
          sources: 'cnn',
          domains: 'cnn.com',
          from: '2020-06-01',
          to: '2020-16-15',
          language: 'en',
          sortBy: 'relevancy',
          page: 1
        })
    console.log(result);
    res.json(result);

})

module.exports = router; 