const express = require('express')
const router=express.Router()
const Inventory=require ('../models/inventory')

//controllers

//Index route

router.get('/', (req,res)=>{
	Inventory.find({}, (err, foundInventory)=>{
		if (err){
			console.log(err)
		}else {
			res.render('index.ejs',{items: foundInventory})
		}	
	})
})

//New
router.get('/new',(req,res)=>{
	res.render('new.ejs')
})

//seeding

router.get('/seed', (req,res)=>{
	Inventory.create([
		{
		item: 'Disposable Plates 16 oz.',
		category: 'Disposables',
		unit_size: '200 units in each sleeve',
		in_stock_qty: 5,
		price: 2
		}, 
		{
		item: 'Disposable Forks.',
		category: 'Disposables',
		unit_size: '1000 units in each box',
		in_stock_qty: 5,
		price: 12
		},
		{
		item: 'Degreaser',
		category: 'Chemicals',
		unit_size: '1 gallon jar',
		in_stock_qty: 10,
		price: 14
		}
	], (err,data)=>{
		if (err) {
			console.log(err)
		}
		res.redirect('/inventory')
	})
})

//Show route
router.get('/:id', (req,res)=>{
	Inventory.findById(req.params.id, (err, foundInventory)=>{
		res.render('show.ejs', {items: foundInventory})
	})
})

//Post Route

router.post('/', (req,res)=>{
	Inventory.create(req.body, (error, createdItem)=>{
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
	Inventory.findByIdAndRemove(req.params.id,(err,data)=>{
		if (err){
			console.log(err)
		} else{
			console.log(data)
			res.redirect('/inventory')
		}
	})
})

//Edit route
router.get ('/:id/edit', (req, res)=>{
	Inventory.findById(req.params.id, (err,foundInventory)=>{
		console.log(foundInventory)
		res.render('edit.ejs', {
			items: foundInventory
		})
	})
})	

//Update Route
router.put('/:id', (req,res)=>{
	Inventory.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedItem)=>{
		res.redirect('/inventory')
	})
})

//buy button
router.put('/:id/buy', (req,res)=>{
	Inventory.findByIdAndUpdate(req.params.id, {$inc:{qty: 1}}, (err, updatedItem)=>{
		updatedItem.save()
		//res.redirect('/inventory')	
	})
})

module.exports=router