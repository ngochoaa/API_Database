const mongoose = require("mongoose");

const CaFeSchema = mongoose.Schema(
  {
    id:{
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please enter your name"],
    },
    category: {
      type: String,
      required: true,
      default: 0,
    },
    price: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const cafe = mongoose.model("Cafe", CaFeSchema);
module.exports = cafe;
