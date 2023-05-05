const mongoose = require("mongoose");

const uudaiSchema = mongoose.Schema(
  {
    TenUD: {
      type: String,
      required: [true, "Please enter your name"],
    },
    Trangthai: {
      type: String,
      required: true,
      default: 0,
    },
    NgayUD: {
      type: String,
      require: true,
    },
    NgayKT: {
      type: String,
      require: true,
    },
    GiaUD: {
      type: String,
      require: true,
    },
    CODE: {
      type: String,
      require: true,
    },
    Decription:{
      type: String,
      require: true,
    },        
    HinhUD:{
      type:String,
      require: true
    }
  },
  {
    timestamps: true,
  }
);

const uudai = mongoose.model("Uudai", uudaiSchema);
module.exports = uudai;
