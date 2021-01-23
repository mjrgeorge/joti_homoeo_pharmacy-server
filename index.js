const express = require("express");
const bodyParser = require("body-parser");
const cors =  require("cors");
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = 30001;

app.get('/', (req, res) => {
    res.send("hello from db it's working working");
});

app.listen(PORT, console.log(" Database connection success"));
