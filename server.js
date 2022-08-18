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
    db = client.db('kruger-national-park')
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

//GET
app.get('/', (req, res) => {
    db.collection('animals').find().toArray()
      .then(results => {
      res.render('index.ejs', {animals: results})
      })
      .catch(error => console.error(error))
    
  })

//API Route

app.get('/api', (request, response) => {
  const animalName = request.params.animalName.toLowerCase()
      db.collection.find().toArray()
      .then(results => {
          console.log(results)
          response.json(results[0])
      })
      .catch(error => console.error(error))
  })

//POST 

app.post('/animals', (req, res) => {
    db.collection('animals').insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

  //UPDATE
  app.put('/update', (req, res)=>{
 
    Object.keys(req.body).forEach(key => {
      if(req.body[key] === null || req.body[key] === undefined || req.body[key] === ''){
        delete req.body[key]
      }
    })
    console.log(req.body)
    db.collection('animals').findOneAndUpdate(
      {animalName: req.body.animalName},
      {
        $set: req.body
      }
    )
    .then(result => {
      console.log(result)
      res.json('Success')
    })
    .catch(err => console.log(err))
  })

  //Delete

  app.delete('/delete', (req, res)=>{
    db.collection('animals').deleteOne(
      {animalName: req.body.animalName}
    )
    .then(result =>{
      console.log('Entry Deleted')
      res.json('Entry Deleted')
    })
    .catch(error => console.console.log(error))
  })

app.listen(process.env.PORT|| PORT, ()=>{
    console.log(`Server running on Port ${process.env.PORT}`)
}) 

