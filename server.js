if (process.env.NODE_ENV !== "production")
    require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");

//load controllers
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const newsfeed = require("./controllers/newsfeed");
const auth = require("./controllers/authorization")

const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl : true
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=> res.send("It's alive!!! IT'S ALI... point made."))

app.post("/signin", (req, res) => signin.signinAuthentication(req, res, db, bcrypt));

app.post("/signout", (req, res) => signout.handleSignout(req, res, db, bcrypt));

app.post("/register", (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get("/profile/:id", auth.requireAuth, (req, res) => profile.handleProfileGet(req, res, db));

app.post("/profile/:id", auth.requireAuth, (req, res) => profile.handleProfileUpdate(req, res, db));

app.put("/image", auth.requireAuth, (req, res) => image.handleImage(req, res, db));

app.post("/imageurl", auth.requireAuth, (req, res) => image.handleClarifaiCall(req, res));

app.post("/newsfeed", (req, res) => newsfeed.handleNewsFeed(req, res));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});