const handleRegister = (req, res, db, bcrypt) => {

    const { name, email, password } = req.body;

    //hash the password and update the database
    bcrypt.hash(password, 10).then(hash => {
        // insert new user into db and return it as network response
        db("users").returning("*").insert({
            name: name,
            email: email,
            passwordenc: hash,
            joined: new Date()
        }).then(users => {
            res.json(users[0]);
        }).catch(err => res.status(400).json("Invalid Field Entries"));

    }).catch(err => {
        console.log(err);
        res.json("Failure registering");
    });
}

module.exports = {
    handleRegister
}