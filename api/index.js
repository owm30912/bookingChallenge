import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
//route
import hotelsApiRoute from "./ApiRoutes/hotels.js";
import roomsApiRoute from "./ApiRoutes/rooms.js";
import usersApiRoute from "./ApiRoutes/uesrs.js";
import authApiRoute from "./ApiRoutes/auth.js";
//token
import cookieParser from "cookie-parser";
//set
const app = express();
const port = 5000;
mongoose.set("strictQuery", false);
//能及時更新
dotenv.config();
//mongoDB連接
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("disconnected to mongoDB");
  }
};
//DB監聽
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
app.listen(port, () => {
  connect();
  console.log(`connected to ${port} backend`);
  //並要像npm start 一樣啟動它，
});

//req.body以json傳輸
app.use(express.json());
app.use(cookieParser());

//middlewares中間代理商概念
app.use("/api/v1/hotels", hotelsApiRoute);
app.use("/api/v1/rooms", roomsApiRoute);
app.use("/api/v1/users", usersApiRoute);
app.use("/api/v1/auth", authApiRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "中間ApiRoute出錯";
  return res.status(errorStatus).json({
    //return回去讓他可以被next(error ) catch
    state: errorStatus,
    Message: errorMessage,
  });
});
