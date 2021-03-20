const express = require('express')
const router=express.Router()
const Orders=require ('../models/orders')

router.get('/', (req,res)=>{
	Orders.find({}, (err, foundInventory)=>{
		if (err){
			console.log(err)
		}else {
			res.render('orders.ejs',{items: foundInventory,
			currentUser: req.session.currentUser
		})
		}	
	})
})


router.post('/new', (req,res)=>{
	Orders.create(req.body, (error, createdItem)=>{
		if (error){
            console.log(error);
            res.send(error);
        }
        else {
          console.log(createdItem)
          res.redirect('/inventory')
        }
	})
})


module.exports=router