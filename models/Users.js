const mongoose = require("mongoose");

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

const User = mongoose.deleteModel("User", userSchema);

module.exports = { User };
