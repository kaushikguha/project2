const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
  item: String,
  order_qty: {type: Number, default: 1, min: 1},
  total: Number,
  orderPlacedBy: String,
  date: { type: Date, default: Date.now }
})

const Orders = mongoose.model('Orders', orderSchema)
module.exports = Orders