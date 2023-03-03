import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from "../RoutesController/user.js";
import { verifyAdmin, verifyUser } from "../JWT_Token.js";

const router = express.Router();

//user的人員管理

//更新user
//verifyUser 因為已經有判斷是否為管理員 所以verifyAdmin可以省略
router.put("/:id", verifyUser, updateUser);
//刪除
router.delete("/:id", verifyUser, deleteUser);
// //讀取單一用戶
router.get("/:id", verifyUser, getUser);
// //讀取所有用戶
router.get("/", verifyAdmin, getAllUsers);

export default router;
