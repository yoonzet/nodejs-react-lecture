const mongoose = require("mongoose");

// 스키마란? 하나하나 정보를 지정해주는 역할. 타입, 문자열길이 등
// 모델은 스키마를 감싸주는 역할을 한다.
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true, // 스페이스 공백을 없애주는 역할 (예: 안 녕=> 안녕)
    unique: 1, // 중복방지
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastName: {
    type: String,
    maxLength: 50,
  },
  role: {
    // role: 관리자와 일반유저를 구분하는 역할
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
