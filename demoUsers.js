const User = require("./models/User.model");
const Admin = require("./models/Admin.model");

const demoUsers = async () => {
  const user_email = "demo-user@email.com";
  const admin_email = "demo-admin@email.com";

  try {
    const demoUserExists = await User.findOne({ user_email });

    const demoAdminExists = await Admin.findOne({ admin_email });

    if (!demoAdminExists) {
      const adminAdmin = await Admin.create({
        admin_name: "admin user",
        admin_email,
        admin_password: "asd",
        admin_phone: 1234567890,
      });

      const adminUser = await User.create({
        user_name: "demo admin",
        user_email: admin_email,
        user_password: "asd",
        user_phone: 1234567890,
        user_address: {
          city: "gotham",
          street: "imbatman",
          building: "13",
          apartment: "3",
        },
        user_orders: [],
        user_avatar: "",
        admin_id: adminAdmin._id,
      });
      console.log("demo admin created");
    } else {
      console.log("demo admin already exists");
    }

    if (!demoUserExists) {
      const regularUser = await User.create({
        user_name: "demo user",
        user_email,
        user_password: "asd",
        user_phone: 1234567890,
        user_address: {
          city: "metropolis",
          street: "main st.",
          building: "13",
          apartment: "3",
        },
        user_orders: [],
        user_avatar: "",
      });

      console.log("demo user created");
    } else {
      console.log("demo user already exists");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = demoUsers;
