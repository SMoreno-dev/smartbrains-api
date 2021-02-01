//imports
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const app = express();
const cors = require("cors");
const knex = require('knex');


//module imports
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//Middleware
app.use(express.json());
app.use(cors());
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'picopelado',
      database : "smart-brain"
    }
});

//root
const PORT = process.env.PORT;

app.get("/", (req, res) => {
})

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
});


//Register
app.post("/register", (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});


//Sign-in
app.post("/signin", (req, res)=> {
    signin.handleSignin(req, res, db, bcrypt);
});


//Profile
app.get("/profile/:id", (req, res) => {
    profile.handleProfile(req, res, db);
});


//Image
app.post("/image", (req, res) => {
    image.handleImage(req, res, db);
})

app.post("/imageurl", (req, res) => {
    image.handleApiCall(req, res)
})

//Bcrypt Async

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });