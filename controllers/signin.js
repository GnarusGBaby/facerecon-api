const jwt = require("jsonwebtoken");

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

const signToken = (email) => {
    const jwtPayload = {email};
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn: "20m"});
}

const createSessions = (user) => {
    //create JWT token
    const token = signToken(user.email);
    //return user data
    return { success: "true", userId: user.id, token }
}

const signinAuthentication = (req, res, db, bcrypt) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenId() :
        handleSignin(req, res, db, bcrypt)
            .then(user => createSessions(user))
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err))
}

module.exports = {
    signinAuthentication
}