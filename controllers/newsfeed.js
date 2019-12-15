const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY)

function handleNewsFeed(req, res) {

    newsapi.v2.everything(req.body).then(response => {
        console.log("response", response.totalResults);
        res.json(response.articles);
    }).catch(err => {
<<<<<<< HEAD
        console.log(err)
        res.status(400).json("unable to get news")
=======
<<<<<<< HEAD
        console.log(err)
        res.status(400).json("unable to get news")
=======
        console.log(err);
        res.status(400).json("unable to get headlines")
>>>>>>> 54f9f8bc0aab902f7d389dd8523f9d1e15d1a82c
>>>>>>> 4d6f0cd66b130d2a1483a48d49858331118a3e28
    })
}

module.exports = {
    handleNewsFeed
}