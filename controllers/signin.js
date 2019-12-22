const handleSignin = (req, res, db, bcrypt) => {
    //get the emails and passwords of every users whose email matches the
    //one signin in...
    return db.select("email", "passwordenc").from("users")
        .where({ email: req.body.email })
        .then(data => {
            //email matches, check if password matches
            //return the user or error
            if (bcrypt.compareSync(req.body.password, data[0].passwordenc)) {
                return db.select("*").from("users").where({ email: req.body.email })
                    .then(users => {
                        // console.log('users[0]', users[0])
                        return users[0];
                    })
                    .catch(err => Promise.reject("Unable to get user"))
            } else {
                Promise.reject("Wrong credentials");
            }
        }).catch(err => Promise.reject("Wrong credentials"));
};

const getAuthTokenId = () => {
    console.log('auth ok')
}

const signinAuthentication = (req, res, db, bcrypt) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenId() :
        handleSignin(req, res, db, bcrypt)
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err))
}

module.exports = {
    signinAuthentication
}