const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: { 
    type: String, 
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'],
    min: [0, 'Price must be at least 0'],
    set: v => parseFloat(v.toFixed(2)) // Ensure 2 decimal places
  },
  image: { 
    type: String, 
    required: [true, 'Product image is required'],
    validate: {
      validator: v => /^(http|https):\/\/[^ "]+$/.test(v),
      message: props => `${props.value} is not a valid URL!`
    }
  },
  category: { 
    type: String,
    trim: true,
    enum: {
      values: ['electronics', 'clothing', 'home', 'books', 'other'],
      message: '{VALUE} is not a valid category'
    },
    default: 'other'
  },
  stock: { 
    type: Number, 
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  rating: {
    rate: { 
      type: Number, 
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5']
    },
    count: { 
      type: Number, 
      default: 0,
      min: [0, 'Rating count cannot be negative']
    }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
productSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);