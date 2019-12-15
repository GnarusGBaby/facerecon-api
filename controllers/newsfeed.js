const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY)

function handleNewsFeed(req, res) {

    newsapi.v2.everything(req.body).then(response => {
        console.log("response", response.totalResults);
        res.json(response.articles);
    }).catch(err => {
        console.log(err)
        res.status(400).json("unable to get news")
    })
}

module.exports = {
    handleNewsFeed
}