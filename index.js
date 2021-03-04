const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

const uri = `mongodb+srv://drRathin:${process.env.DB_PASS}@cluster0.0zkhs.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 30001;

app.get('/', (req, res) => {
    res.send("hello from db it's working working");
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const patientCollection = client.db("jotiHomoeoPharmacy").collection("patient");

    app.post('/addPatient', (req, res) => {
        const patientData = req.body;
        patientCollection.insertOne(patientData)
            .then(result => {
                res.send(result.insertedCount > 0)
            });
    });

    app.get('/viewAllPatient', (req, res) => {
        patientCollection.find({})
            .toArray((error, documents) => {
                res.send(documents)
            })
    });

    app.delete('/deletePatient/:id', (req, res) => {
        patientCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.send(result.deletedCount > 0)
            })
    });

    app.patch('/updatePatient/:id', (req, res) => {
        patientCollection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: { patientName: req.body.patientName, serialNumber: req.body.serialNumber, phone: req.body.phone, disease: req.body.disease, treatment: req.body.treatment, age: req.body.age, totalBill: req.body.totalBill, paidBill: req.body.paidBill }
            })
            .then(result => {
                res.send(result.modifiedCount > 0)
            })
    });

    app.get('/patient/:id', (req, res) => {
        console.log(ObjectId(req.params.id))
        patientCollection.find({ _id: ObjectId(req.params.id) })
            .toArray((error, documents) => {
                res.send(documents[0])
            })
    });
});


app.listen(process.env.PORT || port);
// app.listen(port, () => console.log(`listening on port${port}`));