const redisClient = require("./signin").redisClient;

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        console.log("You shall not pass")
        return res.status(401).json("Unauthorized");
    }
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            console.log("You shall not pass")
            return res.status(401).json("Unauthorized")
        }
        console.log("You shall pass");        
        return next();
    })
}

module.exports = {
    requireAuth
}