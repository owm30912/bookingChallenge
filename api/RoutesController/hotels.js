import Hotel from "../models/Hotel.js";
import { errorMessage } from "../errorMessage.js";

//以post方式，建立hotel資料
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    next(errorMessage(500, "資料上傳錯誤請確認格式"));
  }
};

//抓取第一筆資料練習
export const getHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const getHotel = await Hotel.findById(id);
    res.status(200).json(getHotel);
  } catch (error) {
    next(errorMessage(500, "資料抓取錯誤請確認格式", error));
  }
};

export const getAllHotels = async (req, res, next) => {
  //const popularHotel = req.query.popularHotel;
  const withQuery = req.query;
  try {
    const hotelList = await Hotel.find({
      //...req會找到相關或符合的
      ...withQuery,
      //opularHotel,
    }).limit(7);
    res.status(200).json(hotelList);
  } catch (error) {
    next(errorMessage(500, 無法抓取所有飯店資料, error));
  }
};

//將第一筆資料做修改練習
export const updatedHotel = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(
      errorMessage(
        500,
        "修改失敗，請確認是否有其id與是否欄位輸入格式正確",
        error
      )
    );
  }
};

//刪除資料
export const deleteHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json("刪除資料成功");
  } catch (error) {
    next(errorMessage(500, "刪除失敗，請確認是否有其id", error));
  }
};

//統計各type的種數
export const amountOfType = async (req, res, next) => {
  const type = req.query.type.split(",");
  try {
    const list = await Promise.all(
      type.map((type) => {
        return Hotel.countDocuments({ type });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(errorMessage(500, "無法抓取住宿種類", error));
  }
};

//統計cities的種術
export const amountofcities = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(errorMessage(500, "無法統計各個城市提供的數量", error));
  }
};
