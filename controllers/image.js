const Clarifai = require("clarifai");
// const myapikey = require("../secrets").myapikey;

// Instantiate a new Clarifai app by passing in the API key.
const app = new Clarifai.App({ apiKey: process.env.API_CLARIFAI_KEY });

const handleClarifaiCall = (req, res) => {
    // console.log('req body', req.body)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        console.log('err', err)
        res.status(400).json("unable to work with api")
    })
}
const handleImage = (req, res, db) => {
    const id = req.body.id;
    //update by id the user's entries value, and return it as a response
    db("users").where({ id })
        .increment({
            entries: 1
        }).returning("entries")
        .then(entries => {
            entries.length ? res.json(entries[0]) : res.status(400).json("unable to update the entries");
        })
        .catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
    handleImage,
    handleClarifaiCall
}