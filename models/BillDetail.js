const mongoose = require("mongoose");

const HoadonSchema = mongoose.Schema(
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

const Bill = mongoose.model("Bill", BillSchema);
module.exports = bill;
