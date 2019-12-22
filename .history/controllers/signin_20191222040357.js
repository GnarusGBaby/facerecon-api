const jwt = require("jsonwebtoken");
const redis = require("redis");

//redis setup:
const redisClient = redis.createClient({ host: "redis" })

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
                return Promise.reject("Wrong credentials");
            }
        }).catch(err => Promise.reject("Wrong credentials"));
};

const getAuthTokenId = (req, res) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) return res.status(401).json("Unauthorized")
        return res.json({id: reply})
    })
}

const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "20m" });
}

const setToken = (key, value) => {
    return Promise.resolve(redisClient.set(key, value))
}

const createSessions = (user) => {
    //create JWT token
    const token = signToken(user.email);
    //return user data
    return setToken(token, user.id)
        .then(() => {
            return { success: "true", userId: user.id, token }
        })
        .catch(console.log)
}

const signinAuthentication = (req, res, db, bcrypt) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenId(req, res) :
        handleSignin(req, res, db, bcrypt)
            .then(user => createSessions(user))
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err))
}

module.exports = {
    signinAuthentication,
    redisClient
}