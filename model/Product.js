const  mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image:[{
        type: String,
        required:true 
    }],
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    
    createdAt: { 
        type: String, // Use String to store only the formatted date
        default: () => new Date().toISOString().split('T')[0] // Saves only the date (e.g., "2025-03-28")
      },
      updatedAt: { 
        type: String, 
        default: () => new Date().toISOString().split('T')[0] 
      }
    });
    
    // Middleware to update 'updatedAt' with the date only
    productSchema.pre('save', function (next) {
      this.updatedAt = new Date().toISOString().split('T')[0];
      next();
    });

module.exports = mongoose.model('Product', productSchema);
