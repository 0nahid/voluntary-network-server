const express = require('express')
const app = express()
const cors = require('cors');

const port = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// dot env
require('dotenv').config()

// mongo connection

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tcqve.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function connect() {
    await client.connect();
    console.log('Connected to MongoDB');

    // collection
    const voluntaryCollection = client.db('voluntary').collection('activities');

    // get api 
    app.get('/api/activities', async (req, res) => {
        const activities = await voluntaryCollection.find().toArray();
        res.json(activities);
    });

    // get api by id
    app.get('/api/activities/:id', async (req, res) => {
        const id = req.params.id;
        const activity = await voluntaryCollection.findOne({ _id: ObjectId(id) });
        res.json(activity);
    });

    // post api 
    app.post('/api/activities', async (req, res) => {
        const activity = req.body;
        const result = await voluntaryCollection.insertOne(activity);
        res.json(result);
    });
    


}
connect().catch(console.dir);



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))