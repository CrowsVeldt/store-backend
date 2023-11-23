const mongoose = require("mongoose");

const connection = async () => {
  let url = process.env.MONGO_URL;

  try {
    await mongoose.connect(url);

    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection;
