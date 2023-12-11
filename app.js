const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const logger = require("morgan");
const path = require("path");

const corsOptions = require("./config/corsOptions");
const originCredentials = require("./middlewares/originCredentials");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users.routes");
const adminRouter = require("./routes/admin.routes");
const categoriesRouter = require("./routes/categories.routes");
const productsRouter = require("./routes/products.routes");
const refreshRouter = require("./routes/refresh.routes");
const mailRouter = require("./routes/email.routes");
const paymentsRouter = require("./routes/payments.routes");
const ordersRouter = require("./routes/orders.routes");

const demoUsers = require("./demoUsers");

const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(originCredentials);
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/refresh", refreshRouter);
app.use("/mailer", mailRouter);
app.use("/payments", paymentsRouter);
app.use("/orders", ordersRouter);

demoUsers();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log("Error Handler:", err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send({ err });
});

module.exports = app;
