const Order = require("../models/Order.model");

const createCustomerOrder = async (req, res, next) => {
  try {
    const {
      userId: user,
      customer_details,
      payment_details,
      products,
    } = req.body;

    const order = await Order.create({
      user,
      customer_details,
      payment_details,
      products,
    });

    // send mail to user
    const mailContent = `
    <html>
        <body>
            ....
        </body>
    </html>`;

    return res.status(200).send({
      success: true,
      message: "Succeeded in creating order for user",
      order_number: order.order_number,
    });
  } catch (error) {
    next(error);
  }
};

const getUserOrders = async (req, res, next) => {
  const { userid } = req.params;
  try {
    const userOrders = await Order.find({ user: userid });

    if (userOrders.length === 0) {
      res
        .status(400)
        .send({ success: false, message: "No orders found for user" });
    } else {
      res.status(200).send({
        success: true,
        orders: userOrders,
        message: "User orders found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    if (![1, 2, 3, 4].includes(status)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { order_status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomerOrder,
  getUserOrders,
  updateOrderStatus,
};
