const redisClient = require("./signin").redisClient;

const removeToken = (token) => {
    return Promise.resolve(redisClient.del(token))
}

const handleSignOut = (req, res) => {
    const { authorization } = req.headers;
    if (authorization) {
        removeToken(authorization)
            .then(() => res.json("Sign Out Successful"))
            .catch(err => res.status(400).json("Sign Out Unsuccessful"))
    } else {
        res.status(400).json("Sign Out Unsuccessful")
    }
}

module.exports = {
    handleSignOut
}