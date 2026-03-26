// routes/payment.js
const express = require("express");
const { razorpay } = require("./Razorpay");
const crypto = require("crypto");
const Order = require("../Model/orderModel.js");

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcptid_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
})



router.post("/verify-payment", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    cartItems,
    address,
    amount,
    userId
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign === razorpay_signature) {

    const newOrder = new Order({
      user: userId,
      products: cartItems,
      amount,
      address,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

    await newOrder.save();

    res.json({ success: true });

  } else {
    res.status(400).json({ success: false });
  }
});

router.get("/my-orders/:userId", async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

router.get("/my-orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});


router.put("/update-order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
  const { status } = req.body;
  const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  res.json(updatedOrder);
  }
  catch (error) {
    res.status(500).send(error);
  }
});

router.get("/revenue", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const totalRevenue = orders.reduce((total, order) => total + order.amount, 0);
    res.json({ totalRevenue });
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;