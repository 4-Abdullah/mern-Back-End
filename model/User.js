const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor:  Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cart: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    },],
    order: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        },
        shippingDetails: {
           type: Object,
           trim: true   
        }
    },],
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema);