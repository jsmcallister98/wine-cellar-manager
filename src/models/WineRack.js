const mongoose = require('mongoose');

const WineRackSchema = new mongoose.Schema ({
  label: {
    type: String,
    required: [true, "Please enter a label for this rack"],
    maxlength: [50, "Must be no more than 50 characters"]
  },
  rows: {
    type: [],
    required: [true, "Please enter the number of rows(horizontal)"],
    max: 20
  },
  columns: {
    type: [],
    required: [true, "Please enter the number of columns(vertical)"],
    max: 20
  },
  bottles: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Bottle'
  }],
  isWinerack: {
    type: Boolean
  }
});

module.exports = mongoose.models.WineRack || mongoose.model('WineRack', WineRackSchema);
