const express = require("express");
const app = express();
const port = 4000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://yoon:dlapdlf1@cluster0.2ac5iv3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("몽고디비 연결됨"))
  .catch((err) => console.log("error"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
