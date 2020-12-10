const mongoose = require('mongoose')
import WineRackSchema from './WineRack'
import BottleSchema from './Bottle'

const CellarSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please enter a cellar name"],
    maxlength: [50, "Name must be less than 50 characters"]
  },
  racks: {
    type: [WineRackSchema]
  },
  currentBottles: {
    type: [BottleSchema]
  },
  pastBottles: {
    type: [BottleSchema]
  }
});

module.exports = mongoose.models.Cellar || mongoose.model("Cellar", CellarSchema);
