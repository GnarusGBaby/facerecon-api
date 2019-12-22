const handleProfileGet = (req, res, db) => {
    const id = req.params.id;
    console.log('id', id)

    db.select().from("users").where({ id })
        .then(users => {
            users.length ? res.json(users[0]) : res.status(404).json("User not found");
        }).catch(err => res.status(400).json("error getting user"));
}

const handleProfileUpdate = (req, res, db) => {
    const id = req.params.id;
    const { name, email } = req.body.formInput;

    db("users")
        .where({ id })
        .update({ name, email })
        .then(response => {
            response ? res.json("Success") : res.status(400).json("Unable to update")
        }).catch(err => res.status(400).json("error updating user"))
}

module.exports = {
    handleProfileGet,
    handleProfileUpdate
}