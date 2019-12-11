function areInvalid(name, email, password) {
    return (!name || !email || password.length < 8)
}


const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;

    if (areInvalid(name, email, password)) return res.status(400).json("Invalid Form Submission")

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
        }).catch(err => {
<<<<<<< HEAD
            console.log("/register, error:", err);
=======
            console.log("/register, error:");
>>>>>>> f45a8569dc9d9ba914e4b6b234d0aabec52a42c8
            res.status(400).json("Invalid Field Entries")
        });

    }).catch(err => {
        console.log(err);
        res.json("Failure registering");
    });
}

module.exports = {
    handleRegister
}