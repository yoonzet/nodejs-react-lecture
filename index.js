const express = require("express");
const app = express();
const port = 4000;
const { User } = require("./models/User");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://yoon:dlapdlf1@cluster0.2ac5iv3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("몽고디비 연결됨"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", (req, res) => {
  // 회원가입할때 필요한 정보들을 클라이언트에서 가져오면 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      //200은 성공했다는 표시
      success: true,
    });
  }); //.save는 몽고디비 메서드
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
