const allowedOrigins = require("./allowedOrigin");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      console.log(`origin ${origin} is in allowed list`);
      callback(null, true);
    } else {
      console.log(`origin ${origin} is NOT in allowed list`);
      callback(new Error("Rejected by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
