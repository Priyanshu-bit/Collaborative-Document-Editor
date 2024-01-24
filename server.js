const userRouter = require("./routes/user.js");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", userRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/settyldb")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(5000, () => {
  console.log(`Server connected to 5000`);
});
