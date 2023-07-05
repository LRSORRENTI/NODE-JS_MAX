// We'll add an order model to store 
// orders in a collection

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    products: [
        {
        product: { type: Object,required: true},
        quantity: { type: Number, required: true }
        }
    ]
    })