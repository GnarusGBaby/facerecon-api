const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
//importing my own db credentials from a file
// const dbPassword = require("./secrets").dbPassword;

//load controllers
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const newsfeed = require("./controllers/newsfeed");

const db = knex({
    client: "pg",
    connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=> res.send("It's alive!!! IT'S ALI... point made."))

app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post("/register", (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));

app.put("/image", (req, res) => image.handleImage(req, res, db));

app.post("/imageurl", (req, res) => image.handleClarifaiCall(req, res));

app.post("/newsfeed", (req, res) => newsfeed.handleNewsFeed(req, res));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});