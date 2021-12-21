const express = require('express');
const { response } = require('express');

const app = express();

const port = 3000;

app.get("/", (req , res) => res.send("Hello World"))

app.get("/signout",(req,res) => res.send("Hello you are at the signout route"))

app.get("/hitesh", (req,res) => res.send("Hey Hitesh Sir"))


const admin = (req, res) => {
    return res.send("This is admin page")
}

const isAdmin = (req,res, next) => {
    console.log("Hey Admin is running");
    next()
}

const isLogged = (req,res,next) => {
    console.log("Hey you are logged in")
    next();
}

app.get("/admin", isLogged , isAdmin , admin)

app.listen(port, () => console.log(`This app is listening at port ${port}`))