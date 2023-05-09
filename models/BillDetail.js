const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
  {
    billId: { type: mongoose.Schema.Types.ObjectId, ref: "Hoadon" },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bill = mongoose.model("Bill", BillSchema);
module.exports = bill;
