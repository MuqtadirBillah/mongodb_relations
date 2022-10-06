require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const moment = require("moment");
var mongoose = require("mongoose");
const Person = require('./models/person');
const Task = require('./models/task');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

const mongoAtlasUri = `mongodb://localhost:27017/mongooseRelationExample`

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose is connected"),
    );
} catch (e) {
    console.log("could not connect");
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.get("/tasks/view", (req, res)=>{
    Task.find().populate('assigned_to').exec(function(error, docs){
        if(!error){
            res.status(200).json({
                status: "success",
                data: docs
            })
        }
        else{
            console.log(error)
            res.send({
                status: "error",
                error: error
            })
        }
    })
})

app.post("/person/create", (req, res)=>{
    try {
        const person = new Person({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            creation_date: moment().format("MMMM Do YYYY, h:mm:ss a")
        });
        person.save();
        res.send({
            status: 'success',
            message: `${req.body.first_name} successfully added!`
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'error',
            message: error
        });
    }
});

app.post("/task/create", (req, res)=>{
    try {
        const task = new Task({
            task_name: req.body.name,
            assigned_to: req.body.personId,
            creation_date: moment().format("MMMM Do YYYY, h:mm:ss a")
        });
        task.save();
        res.send({
            status: 'success',
            message: `${req.body.task_name} successfully added!`
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'error',
            message: error
        });
    }
});

app.use((_, res) =>{
    res.send({
        message: 'Not found!'
    })
});

app.listen(5000, (req, res)=>{
    console.log("Server is listening on port 5000");
})