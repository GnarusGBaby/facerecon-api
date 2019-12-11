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
    handleImage
}