const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile_number: {
    type: Number,
  },
  skills: {
    type: Array,
  },
  college_name: {
    type: String,
  },
  degree: {
    type: Array,
  },
  experience: {
    type: Array,
  },
  total_experience: {
    type: Number,
  },
  
company_names: {
    type: Array,
}
});

const detailsModel = mongoose.model("details", detailsSchema);
module.exports = detailsModel;
