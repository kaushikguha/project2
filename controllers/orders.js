const express = require('express')
const router=express.Router()
const Orders=require ('../models/orders')

//Index
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

//Create
router.post('/:id', (req,res)=>{
    req.body.total=req.body.order_qty*req.body.price	
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

//Destroy/Delete
router.delete('/:id', (req,res)=>{
	Orders.findByIdAndRemove(req.params.id,(err,data)=>{
		if (err){
			console.log(err)
		} else{
			console.log(data)
			res.redirect('/orders')
		}
	})
})



module.exports=router