const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db, 
dbConnectionString = process.env.DB_STRING,
dbname = 'kruger-park-db',
collection

//Connect Database
MongoClient.connect(dbConnectionString)
.then(client => {
    console.log('Connected to DB')
    db = client.db(dbname)
    collection = db.collection('animals')
})

//Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//Body parser is no longer needed. Express has built in it's fucntionality directly.
app.use(cors())

//Routes
app.get('/', async(req, res)=>{
    try{
        res.render('index.ejs')
    }catch(error){
        res.status(500).send({message: error.message})
    }
})

app.listen(process.env.PORT|| PORT, ()=>{
    console.log(`Server running on Port ${process.env.PORT}`)
}) 

