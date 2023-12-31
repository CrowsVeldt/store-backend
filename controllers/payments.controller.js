const { makeRequest } = require("../services/rapydApiRequest");
const Order = require("../models/Order.model");

const createPayment = async (req, res, next) => {
  const {
    //cartDetails,
    //userDetails,
    cartTotal,
    creditNumber,
    expDate,
    cvv,
    orderDetails,
  } = req.body;

  const { userId, customer_details, products } = orderDetails;
  const user = userId;

  const expiration_month = expDate.slice(0, 2);
  const expiration_year = expDate.slice(-2);

  const last_digits = creditNumber.slice(-4);

  const { city, street, building, apartment, customer_name } = customer_details.customer_address

  const address = `${street} ${building}/${apartment}, ${city}`;

  try {
    const order = await Order.create({
      user,
      customer_details,
      payment_details: {
        transaction_number: "q234567" + Date.now(),
        terminal_number: "123456789",
        last_digits,
      },
      products,
    });

    const requestBody = {
      amount: cartTotal,
      currency: "USD",
      payment_method: {
        type: "il_visa_card",
        fields: {
          number: creditNumber,
          expiration_month,
          expiration_year,
          name: customer_name,
          cvv,
          address,
        },
        metadata: {
          merchant_defined: true,
        },
      },
      error_payment_url: `${process.env.CLIENT_URL2}/rejected-payment`,
      complete_payment_url: `${process.env.CLIENT_URL2}/success-payment?token=${order._id}`,
      capture: true,
    };

    const response = await makeRequest("POST", "/v1/payments", requestBody);
    const { redirect_url: redirectUrl } = response.body.data;

    res.send({
      paymentStatus: {
        redirectUrl,
        token: order._id,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createPayment,
};

// const terminal_number = "12345678890";
// const transaction_date = Date.now();
// const transaction_number = terminal_number + transaction_date;
// const last_digits = credit_number.slice(-4);

// res.status(200).send({
//   success: true,
//   message: "Payment Successful",
//   paymentStatus: {
//     last_digits,
//     terminal_number,
//     transaction_number,
//     transaction_date,
//   },
// });
