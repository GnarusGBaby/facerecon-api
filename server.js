const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
//importing my own db credentials from a file
const dbPassword = require("./dbpass").dbPassword;

const db = knex({
    client: "pg",
    connection: {
        host: 'localhost',
        user: 'gnarus',
        password: dbPassword,
        database: 'facerecon'
    }
});

db.select('*').from("users")
    .then(data => console.log('data', data))

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    // res.send(database.users);
})

app.post("/signin", (req, res) => {
    console.log("/signin, request body:", req.body);

    //get the emails and passwords of every users whose email matches the
    //one signin in...
    db.select("email", "passwordenc").from("users")
        .where({ email: req.body.email })
        .then(data => {
            //email matches, check if password matches
            //return the user or error
            if (bcrypt.compareSync(req.body.password, data[0].passwordenc)) {
                db.select("*").from("users").where({ email: req.body.email })
                    .then(users => {
                        console.log('users[0]', users[0])
                        res.json(users[0])
                    })
                .catch(err => res.status(400).json("unable to get user"))
            } else {
                res.status(400).json("wrong credentials");
            }
        }).catch(err => res.status(400).json("wrong credentials"));
});

app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    //hash the password and update the database
    bcrypt.hash(password, 10).then(hash => {
        // insert new user into db and return it as network response
        db("users").returning("*").insert({
            name: name,
            email: email,
            passwordenc: hash,
            joined: new Date()
        }).then(response => {
            res.json(response);
        }).catch(err => res.status(400).json("Invalid Field Entries"));

    }).catch(err => {
        console.log(err);
        res.json("Failure registering");
    });
})

app.get("/profile/:id", (req, res) => {
    const id = req.params.id;

    db.select().from("users").where({ id })
        .then(users => {
            users.length ? res.json(users[0]) : res.status(404).json("User not found");
        }).catch(err => res.status(400).json("error getting user"));
})

app.put("/image", (req, res) => {
    const id = req.body.id;
    //update by id the user's entries value, and return it as a response
    db("users").where({ id })
        .increment({
            entries: 1
        }).returning("entries")
        .then(entries => {
            entries.length ? res.json(entries[0]) : res.status(400).json("unable to update the entries");
        })
        .catch(err => res.status(400).json("unable to get entries"))
});


app.listen(3333, () => {
    console.log("app is running on port 3333");
});