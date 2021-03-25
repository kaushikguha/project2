require('dotenv').config()
const express=require('express')
const app=express()
const PORT =process.env.PORT
const session =require('express-session')



//Set up database
const mongoose= require('mongoose')

//Method Override
const methodOverride=require('method-override')
app.use(methodOverride('_method'))

//Database name inventorycrud
const mongoURI = process.env.MONGODBURI
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

app.use((res,req,next)=>{
	next()
})

// set up static assets (images/css/client-side JS/etc)
app.use(express.static('public'))

// this will parse the data and create the "req.body" object
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: process.env.SECRET,
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
}))

const isAuthenticated=(req,res,next)=>{
	console.log('her')
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}

//Controllers

const inventoryController=require('./controllers/inventory.js')
app.use('/inventory', isAuthenticated,inventoryController)

const userController=require('./controllers/users.js')
app.use('/users', userController)

const sessionsController=require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

const ordersControllers = require('./controllers/orders')
app.use('/orders', isAuthenticated, ordersControllers);

// HOMEPAGE Route
app.get('/', (req, res) => {
    res.render('home.ejs', {
        currentUser: req.session.currentUser
    })
})



app.listen(PORT, ()=>{
	console.log('Project 2 Server is listening')
})