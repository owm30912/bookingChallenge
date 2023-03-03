import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { errorMessage } from "../errorMessage.js";
//這邊上面import 都要記得 而且也要記得加.js

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    // 先儲存saveRoom 格式進去room資料庫
    const saveRoom = await newRoom.save();
    //console.log("我先發生嗎")
    try {
      // 然後再先找hotel Id 找到後如果有 就可以串接起來
      //console.log("還是我")
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: saveRoom._id },
      });
    } catch (error) {
      //如果沒找到就傳這個結果
      next(errorMessage(500, "找不到hotel id 無法上傳room更新", error));
    }
    res.status(200).json(saveRoom);
  } catch (error) {
    next(errorMessage(500, "room的上傳失敗，可能為格式錯誤", error));
  }
};

export const updatedRoom = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(
      errorMessage(500, "room的更新失敗，可能為格式錯誤或是找不到其ID", error)
    );
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const roomId = req.params.id;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { room: roomId } });
    } catch (error) {
      next(error);
    }
    res.status(200).json("成功刪除房間資訊");
  } catch (error) {
    next(errorMessage(500, "刪除失敗，找不到其ID", error));
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const getRoom = await Room.findById(req.params.id);
    res.status(200).json(getRoom);
  } catch (error) {
    next(errorMessage(500, "搜尋失敗，找不到其ID", error));
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const getRooms = await Room.find();
    res.status(200).json(getRooms);
  } catch (error) {
    next(errorMessage(500, "搜尋失敗，為資料庫變動問題", error));
  }
};

export const getHotelRooms = async (req, res, next) => {
  const gethotel = req.params.hotelid;
  try {
    const hoteldata = await Hotel.findById(gethotel);
    try {
      const roomsList = await Promise.all(
        hoteldata.rooms.map((roomId) => {
          return Room.findById(roomId);
        })
      ); //是利用Room資料庫裡面所有的rooms裡面
      res.status(200).json(roomsList); //找尋現在在hoteldata的那些符合id的room 全部資料叫出來
    } catch (error) {
      next(
        errorMessage(
          500,
          "發生錯誤，找尋房間時發生錯誤，可能為Room資料庫問題",
          error
        )
      );
    }
  } catch (error) {
    next(errorMessage(500, "找不到hotel id 無法查看rooms", error));
  }
};
