// #13 Auth기능만들기
const { User } = require("../models/User");
let auth = (req, res, next) => {
  // 인증처리를 하는곳

  // 1. 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 2. 토큰을 복호화 한 후 유저를 찾는다 (복호화: 사람이 읽을 수 있는 코드)
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    //   유저가 있으면 인증하고 유저가 없으면 인증불가

    next(); // 미들웨어에서 다음단계로 넘어가는 함수
  });
};
module.exports = { auth };
