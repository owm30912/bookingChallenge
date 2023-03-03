import { errorMessage } from "../errorMessage.js";
import User from "../models/User.js";

//res和req的順序不能顛倒
//req 分別有.body(json資料) .params(網址資料 /:XXX) .query(網址資料 ?XXX=XXX)
export const updateUser = async (req, res, next) => {
  console.log("id: ", req.params.id);
  const id = req.params.id;
  const body = req.body;
  //防止使用者更新相同名稱及信箱
  const updateUserNameWrong = await User.findOne({ username: body.username });
  const updateEmailWrong = await User.findOne({ email: body.email });
  const originalUser = await User.findById(id);
  if (updateUserNameWrong && updateUserNameWrong.id != originalUser) {
    console.log("21");
    return next(errorMessage(400, "錯誤, 此名稱已使用"));
  }
  if (updateEmailWrong && updateEmailWrong.id != originalUser)
    return next(errorMessage(400, "錯誤, 此信箱已使用"));
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("錯誤");
    next(errorMessage(500, "更改用戶失敗", error));
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("用戶成功刪除");
  } catch (error) {
    next(errorMessage(500, "刪除用戶失敗", error));
  }
};

export const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getUser = await User.findById(id);
    res.status(200).json(getUser);
  } catch (error) {
    next(errorMessage(500, "讀取用戶失敗", error));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (error) {
    next(errorMessage(500, "讀取全部用戶失敗", error));
  }
};
