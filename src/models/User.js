const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema ({
  email: {
    type: String
  },
  racks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Winerack'
  }],
  bottles: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Bottle'
  }],
  cellars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cellar'
  }]
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
