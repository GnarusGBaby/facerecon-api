const handleSignin = (req, res, db, bcrypt) => {
    console.log("/signin, request body:", req.body);

    //get the emails and passwords of every users whose email matches the
    //one signin in...
    db.select("email", "passwordenc").from("users")
        .where({ email: req.body.email })
        .then(data => {
            //email matches, check if password matches
            //return the user or error
            if (bcrypt.compareSync(req.body.password, data[0].passwordenc)) {
                db.select("*").from("users").where({ email: req.body.email })
                    .then(users => {
                        console.log('users[0]', users[0])
                        res.json(users[0])
                    })
                .catch(err => res.status(400).json("Unable to get user"))
            } else {
                res.status(400).json("Wrong credentials");
            }
        }).catch(err => res.status(400).json("Wrong credentials"));
};

module.exports = {
    handleSignin
}