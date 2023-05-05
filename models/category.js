const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
});

const category = mongoose.model("Category", categorySchema);
module.exports = category;
