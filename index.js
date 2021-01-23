const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = `mongodb+srv://drRathin:${process.env.DB_PASS}@cluster0.0zkhs.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = 30001;

app.get('/', (req, res) => {
    res.send("hello from db it's working working");
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const patientCollection = client.db("jotiHomoeoPharmacy").collection("patient");

    app.post('/addPatient', (req, res) => {
        const patientData = req.body;
        console.log(patientData);
        patientCollection.insertOne(patientData)
            .then(result => {
                res.send(result.insertedCount > 0)
            });
    });
});


app.listen(PORT, console.log(" Database connection success"));
