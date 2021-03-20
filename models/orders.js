const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
  item: {type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'},
  order_qty: {type: Number, default: 1, min: 1},
  total: Number,
  orderPlacedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Orders = mongoose.model('Orders', orderSchema)
module.exports = Orders