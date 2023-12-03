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

module.exports = {
  createCustomerOrder,
};
