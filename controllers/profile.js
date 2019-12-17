const handleProfileGet = (req, res, db) => {
    const id = req.params.id;

    db.select().from("users").where({ id })
        .then(users => {
            users.length ? res.json(users[0]) : res.status(404).json("User not found");
        }).catch(err => res.status(400).json("error getting user"));
}

module.exports = {
    handleProfileGet
}