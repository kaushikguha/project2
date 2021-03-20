const bcrypt=require('bcrypt')
const express=require('express')
const router=express.Router()
const User=require('../models/users.js')

router.get('/new', (req,res)=>{
	res.render('users/new.ejs', {currentUser: req.session.currentUser})
})



router.post('/',(req,res)=>{
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	User.create(req.body, (err, createdUser)=>{
		if(err){
			res.send(err.message)
		} else{
			console.log('user is created', createdUser)
			req.session.currentUser=createdUser
			res.redirect('/inventory')
		} 


	})

})


module.exports=router