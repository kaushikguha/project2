
const express=require('express')
const app=express()
const PORT =3010



//Set up database
const mongoose= require('mongoose')

//Method Override
const methodOverride=require('method-override')
app.use(methodOverride('_method'))

//Database name inventorycrud
const mongoURI = "mongodb://127.0.0.1:27017/inventorycrud"
const db=mongoose.connection

mongoose.connect(mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("database connection checked");
})

db.on('error', (err)=> { console.log('ERROR: ', err)});
db.on('connected', ()=> { console.log("mongo connected")})
db.on('disconnected', ()=> { console.log("mongo disconnected")})

// set up static assets (images/css/client-side JS/etc)
app.use(express.static('public'))

// this will parse the data and create the "req.body" object
app.use(express.urlencoded({extended: true}))

//Controllers

const inventoryController=require('./controllers/inventory.js')
app.use('/inventory', inventoryController)


app.listen(PORT, ()=>{
	console.log('Project 2 Server is listening')
})