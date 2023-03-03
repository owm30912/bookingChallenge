import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  updatedHotel,
  amountOfType,
  amountofcities,
} from "../RoutesController/hotels.js";
import { verifyAdmin } from "../JWT_Token.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);
router.get("/find/:id", getHotel);
router.get("/", getAllHotels);
router.put("/:id", updatedHotel);
router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/amountoftype", amountOfType);
router.get("/amountofcities", amountofcities);

export default router;
