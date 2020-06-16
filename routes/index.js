const path = require("path");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a67400228579488db4aefbbbd0716576');

module.exports = app => {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/index.html"));
    });

    // newsapi.v2.everything({
    //     q: 'bitcoin',
    //     sources: 'bbc-news,the-verge',
    //     domains: 'bbc.co.uk, techcrunch.com',
    //     from: '2017-12-01',
    //     to: '2017-12-12',
    //     language: 'en',
    //     sortBy: 'relevancy',
    //     page: 2
    // }).then(response => {
    //     console.log(response);
    // });

}