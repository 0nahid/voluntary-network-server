const express = require('express')
const app = express()
const port = process.env.port || 5500

// Middleware
app.use(express.json()) 
const cors = require('cors')
app.use(cors()) 


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))