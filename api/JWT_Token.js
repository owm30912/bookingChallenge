import Jwt from "jsonwebtoken";
import { errorMessage } from "./errorMessage.js";

const JWT_Token = (req, res, next, callBackFunction) => {
  //取得insomnia的cookies裡的token
  const token = req.cookies.JWT_token;
  console.log("token: " + req.cookies.JWT_token);
  if (!token) {
    return next(errorMessage(401, "請先登入"));
  }
  //Jwt.verify()解碼token 將資料抓出
  //param1=cookies抓出來的token param2=.env的JWT
  //param3為call-back function
  Jwt.verify(token, process.env.Jwt, (err, payload) => {
    if (err) {
      return next(errorMessage(403, "TOKEN無效,解開JWT失敗"));
    }
    req.userData = payload;
    //成功解密就next到verifyUser||verifyAdmin
    callBackFunction();
  });
};

//都先解碼在判斷是否為一般用戶
export const verifyUser = (req, res, next) => {
  JWT_Token(req, res, next, () => {
    const apiUserId = req.params.id;
    console.log("member: " + req.userData.id);
    if (req.userData.id == apiUserId || req.userData.isAdmin) {
      //如果是管理員或會員就next到RoutesController
      next();
    } else {
      next(errorMessage(403, "只能修改個人資料或你不是管理員"));
    }
  });
};

//都先解碼在判斷是否為管理員
export const verifyAdmin = (req, res, next) => {
  JWT_Token(req, res, next, () => {
    console.log("isAdmin: " + req.userData.isAdmin);
    if (req.userData.isAdmin) {
      //如果是管理員就next到RoutesController
      next();
    } else {
      next(errorMessage(403, "你沒有管理員權限"));
    }
  });
};
