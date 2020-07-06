const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a67400228579488db4aefbbbd0716576');
const express = require("express");
const router = express.Router();
// const readlineSync = require('readline-sync');

router.post("/newsapi", async (req, res) => {
    console.log("---", req)
    try {
    const result = await newsapi.v2.everything({
          q: req.body.name,
          sources: '',
          domains: 'https://www.newsobserver.com/',
          from: '2020-06-15',
          to: '2020-07-02',
          language: 'en',
          sortBy: 'relevancy',
          page: 1
        })
    console.log("Search Results")
    console.log(result);
    res.json(result);}
    catch (err) {
        
        console.log(err);
      }
})

module.exports = router; 