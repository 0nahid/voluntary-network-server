const express = require('express')
const app = express()
const port = process.env.port || 5500

// Middleware
app.use(express.json())
const cors = require('cors')
app.use(cors())

// dot env
require('dotenv').config()

// mongo connection

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tcqve.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err.codeName, `& ${err.message}`);
    }
    // collection
    const voluntaryCollection = client.db('voluntary').collection('activities');

    // get api 
    app.get('/api/activities', async (req, res) => {
        const activities = await voluntaryCollection.find().toArray();
        res.json(activities);
    });

    // delete api
    app.delete('/api/activities/:id', async (req, res) => {
        const id = req.params.id;
        const activity = await voluntaryCollection.findOneAndDelete({ _id: ObjectId(id) });
        res.json(activity)
    });


}
connect().catch(console.dir);



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))