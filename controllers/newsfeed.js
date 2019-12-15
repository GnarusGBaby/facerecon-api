const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY)

function handleNewsFeed(req, res) {
    newsapi.v2.topHeadlines(req.body || {
        q: "machine learning",
        category: 'technology',
        language: 'en',
        // country: 'us'
    }).then(response => {
        console.log(response);
        res.json(response.articles);
    }).catch(err => {
        console.log(err)
        res.status(400).json("unable to get headlines")
    })
}

module.exports = {
    handleNewsFeed
}