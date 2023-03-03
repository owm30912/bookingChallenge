import { errorMessage } from "../errorMessage.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  //   const newUser = new User(req.body);
  const registerData = req.body;
  try {
    const registerWrong =
      (await User.findOne({ username: registerData.User })) ||
      (await User.findOne({ email: registerData.email }));
    if (registerWrong)
      return next(errorMessage(400, "錯誤,此帳或信箱已被註冊"));
    const salt = bcrypt.genSaltSync(10);
    //單獨對password加密
    const hash = bcrypt.hashSync(registerData.password, salt);
    //重新將user組件起來
    const newUser = new User({
      username: registerData.username,
      email: registerData.email,
      password: hash,
    });
    console.log("newUser: " + newUser);
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    //console.log("500錯誤!!!!");
    next(errorMessage(500, "資料上傳錯誤請確認格式"));
  }
};

export const login = async (req, res, next) => {
  const loginData = req.body;
  try {
    //表示account輸入名字跟信箱都行
    const userData =
      (await User.findOne({ username: loginData.account })) ||
      (await User.findOne({ email: loginData.account }));
    if (!userData) return next(errorMessage(404, "沒有此使用者"));
    //用compare比較加密的密碼
    const isPasswordCorrect = await bcrypt.compare(
      loginData.password,
      userData.password
    );
    if (!isPasswordCorrect) return next(errorMessage(404, "密碼錯誤"));

    //id + isAdnim = token
    //jwt.sign產生出來的token
    const token = jwt.sign(
      //這邊是取json檔的id(_id)
      { id: userData._id, isAdmin: userData.isAdmin },
      process.env.JWT
    );
    //將token印在cookie裡
    res
      .cookie("JWT_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(`${userData.username}登入成功`);
    console.log(token);
  } catch (error) {
    next(errorMessage(500, "登入失敗", error));
  }
};
