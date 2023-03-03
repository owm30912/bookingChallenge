import express from "express";
import { register, login } from "../RoutesController/auth.js";

const router = express.Router();

//處理註冊和登入的頁面

//處理註冊與登入的地方 處理註冊頁面
router.post("/register", register);
//將使用者資料上傳 處理登入頁面
router.post("/login", login);

export default router;
