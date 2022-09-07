const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt가 10자리라는 뜻
const jwt = require("jsonwebtoken");

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

// #10 bcrypt로 비밀번호 암호화
// .pre는 몽구스에서 가져온 메소드.
// .save메서드를 호출하기 전에 두번째 파라미터의 함수를 실행하고
// next를 함수안에서 호출하면 다음것(save메서드)이 실행된다.
userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    // 비번을 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });  
  } else {
    next();
  }
});

// #11 plain비밀번호(암호회 되기전 비밀번호)와 암호화된 비밀번호 비교
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// #12 토큰생성
userSchema.methods.generateToken = function (cb) {
  var user = this;

  //jsonwebtoken을 이용해서 토큰생성하기
  // ._id는 데이터베이스에 있는 아이디를 의미함
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // user._id + 'secretToken' = token => 'secretToken' => user._id

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// #13 Auth기능 만들기
userSchema.statics.findByToken = function (token, cb) {
  //복호화 하는 과정
  var user = this;

  // 1. 토큰을 decode한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은다음 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
