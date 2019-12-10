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

const database = {
    users: [
        {
            id: 123,
            name: "Joe",
            email: "john@gmail.com",
            // password: "cookies",
            passwordEnc: "$2a$10$UgAk98mZySWsZfo9RGYjVOizctiLAAPS7K5vcB4Ip0/UlFjfU2Unm",
            entries: 0,
            joined: new Date()
        },
        {
            id: "143",
            name: "Amy",
            email: "amy@gmail.com",
            // password: "love",
            passwordEnc: "$2a$10$gMZwt.cNo2qgpt8AJLUvCuTt24j/g513uHIPL5U/NGY7sXiWRl9jG",
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get("/", (req, res) => {
    res.send(database.users);
})

app.post("/signin", (req, res) => {
    console.log("request body:", req.body)
    if (req.body.email === database.users[0].email) {
        bcrypt.compare(req.body.password, database.users[0].passwordEnc).then(status => {
            console.log("password isLegit:", status);
            status ? res.json(database.users[0]) : res.status(400).json("error logging in");
        }).catch(err => console.log('err', err));
    } else {
        res.status(400).json("error logging in");
    }
})

app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    bcrypt.hash(password, 10).then(hash => {
        // insert new user into db and return it as network response
        db("users").returning("*").insert({
            name: name,
            email: email,
            passwordenc: hash,
            joined: new Date()
        }).then(response => {
            res.json(response);
        })
    }).catch(err => {
        console.log(err);
        res.json("Failure registering");
    });

    // res.json(database.users[database.users.length - 1]);
})

app.get("/profile/:id", (req, res) => {
    const id = req.params.id;
    let found = false;
    database.users.forEach(user => {
        found = true;
        if (user.id == id) return res.json(user);
    })
    if (!found) {
        res.status(404).json("no such user found")
    }
})

app.put("/image", (req, res) => {
    const id = req.body.id;
    let found = false;
    database.users.forEach(user => {
        if (user.id == id) { found = true; return res.json(++user.entries) };
    })
    if (!found) {
        res.status(404).json("no such user found")
    }
})

app.listen(3333, () => {
    console.log("app is running on port 3333");
});