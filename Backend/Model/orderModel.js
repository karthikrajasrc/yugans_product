const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },

  products: [
    {
      productId: String,
      name: String,
      price: Number,
        quantity: Number,
      weight: String,
    }
    ],
  amount: Number,
  address: {
      firstName: String,
  lastName: String,
  fullAddress: String,
  pincode: String,
  phone: String,
  altPhone: String,
  },
  status: {
    type: String,
    default: "Placed",
    },
  paymentId: String,
  orderId: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema, "Orders");