const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const profileHandler = require("./routeHandler/profileHandler");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// application  route

app.use("/api", profileHandler);

//default error handler

function errorHanlder(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
