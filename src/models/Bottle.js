const mongoose = require("mongoose");

const BottleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    trim: true,
    maxlength: [50, 'Must be no more than 50 characters']
  },
  year: {
    type: String,
    required: [true, 'Please enter a year'],
    trim: true, 
    maxlength: [4, 'Must be 4 digits'],
    minlength: [4, 'Must be 4 digits'] 
  },
  type: {
    type: String,
    required: [true, 'Please choose a type']
  },
  location: {
    type: String,
    required: [true, 'Please enter a location'],
    trim: true,
    maxlength: [50, 'Must be no more than 50 characters']
  },
  rack: {
    type: String,
    required: true
  }, 
  xPosition: {
    type: Number,
    required: [true, 'Please enter which column this bottle is in']
  },
  yPosition: {
    type: Number,
    required: [true, 'Please enter which row this bottle is in']
  },
  isBottle: {
    type: Boolean
  }
});

module.exports = mongoose.models.Bottle || mongoose.model('Bottle', BottleSchema);