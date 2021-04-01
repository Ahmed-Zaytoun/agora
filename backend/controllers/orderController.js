import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route post /api/orders
// @access Protected
const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.lrnght === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    //get the user id from the token
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc Get order by Id
// @route get /api/orders/:id
// @access Protected
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});
// @desc Get logged in user orders
// @route get /api/orders/myorders
// @access Privit
const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });
  if (order.length !== 0) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("you have no orders");
  }
});

// @desc Get All orders
// @route get /api/orders/
// @access private/ ADMIN
const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate("user", "id name");
  res.json(order);
});

// @desc update order to deliverd
// @route get /api/orders/:id/delivee
// @access private/ ADMIN
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.DeliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
    console.log(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

export {
  addOrderItem,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
