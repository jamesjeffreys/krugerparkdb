const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db, 
dbConnectionString = process.env.DB_STRING,
dbname = 'kruger-park-db',
collection

MongoClient.connect(dbConnectionString)
.then(client => {
    console.log('Connected to DB')
    db = client.db(dbname)
    collection = db.collection('animals')
})

app.listen(process.env.PORT|| PORT, ()=>{
    console.log(`Server running on Port ${process.env.PORT}`)
}) 

