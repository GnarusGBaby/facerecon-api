const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
//importing my own db credentials from a file
const dbPassword = require("./secrets").dbPassword;

//load controllers
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: "pg",
    connection: {
        host: 'localhost',
        user: 'gnarus',
        password: dbPassword,
        database: 'facerecon'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post("/register", (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));

app.put("/image", (req, res) => image.handleImage(req, res, db));

app.post("/imageurl", (req, res) => image.handleClarifaiCall(req, res));


app.listen(3333, () => {
    console.log("app is running on port 3333");
});