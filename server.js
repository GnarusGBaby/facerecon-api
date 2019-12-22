<<<<<<< HEAD
if (process.env.NODE_ENV !== "production")
    require("dotenv").config();

=======
>>>>>>> dockered
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
<<<<<<< HEAD
=======
//importing my own db credentials from a file
// const dbPassword = require("./secrets").dbPassword;
>>>>>>> dockered

//load controllers
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const newsfeed = require("./controllers/newsfeed");

const db = knex({
    client: "pg",
    connection: {
<<<<<<< HEAD
        connectionString: process.env.DATABASE_URL,
        ssl : true
=======
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
>>>>>>> dockered
    }
});

const app = express();
<<<<<<< HEAD

=======
>>>>>>> dockered
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=> res.send("It's alive!!! IT'S ALI... point made."))

app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post("/register", (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));

<<<<<<< HEAD
app.post("/profile/:id", (req, res) => profile.handleProfileUpdate(req, res, db));

=======
>>>>>>> dockered
app.put("/image", (req, res) => image.handleImage(req, res, db));

app.post("/imageurl", (req, res) => image.handleClarifaiCall(req, res));

app.post("/newsfeed", (req, res) => newsfeed.handleNewsFeed(req, res));

const PORT = process.env.PORT;
app.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`app is running on port ${PORT}`);
=======
    console.log(`App is running on port ${PORT}`);
>>>>>>> dockered
});