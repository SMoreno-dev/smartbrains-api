const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());



//Temporary database
const database = {
    users: [ 
        {
            id: "123",
            name: "John",
            email: "john@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Sally",
            email: "sally@gmail.com",
            password: "bananas",
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: "987",
            hash: "",
            email: "john@gmail.comn"
        }
    ]
}

//root
app.get("/", (req, res) => {
    res.json(database.users);
})

app.listen(3000, () => {
    console.log("App is running on port 3000")
});


//Register
app.post("/register", (req, res) => {
    if(req.body.email !== database.users[0].email) {
        const { email, password, name } = req.body;
        bcrypt.hash(password, null, null, function(err, hash) {
            console.log(hash);
        });
        database.users.push({
            id: "125",
            name: name,
            email: email,
            entries: 0,
            joined: new Date()
        })
        res.json(database.users[database.users.length-1]);
    } 
})


//Sign-in
app.post("/signin", (req, res)=>  {
    if (req.body.email === database.users[0].email &&
            req.body.password === database.users[0].password) {
        return res.json(database.users[0]);
    } else {
        return res.status(400).json("error logging in!");
    }
})


//Profile

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            console.log("found");
            return res.json(user);
        } 
    }) 
    if (!found) {
        console.log("not found");
        res.status(404).json("user not found");
    }
})


//Image

app.post("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            console.log("found");
            user.entries++;
            return res.json(user.entries);
        } 
    })
    if(!found) {
        res.status(404).json("not found");
    }
})

//Bcrypt



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });