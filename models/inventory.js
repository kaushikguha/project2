const mongoose=require('mongoose')
const {Schema, model}=mongoose

const inventorySchema=new Schema({
	item: String,
	category: String,
	unit_size: String,
	in_stock_qty: {type: Number, min: 0},
	price: Number,
	must_order: {type: Boolean, default: false},
	order_qty:{type: Number, min:0, default: 0}

})

const Inventory= model('Inventory', inventorySchema)
module.exports=Inventory