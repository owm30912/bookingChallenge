import React from "react";
import "./popularHotelss/popularHotels.css";
import Skeleton from "../components/Skeleton";
import { Link } from "react-router-dom";

const PopularHotels = ({ dataArray, loading }) => {
  // const isloading = true;
  return (
    <div className="popularHotels">
      {loading ? (
        <Skeleton type="popularHotel" length={7} />
      ) : (
        <>
          {" "}
          {dataArray.map((item, index) => (
            <Link
              to={`/hotels/${item._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              key={index}
            >
              <div className="item">
                <img src={item.photos[0]} alt="" />
                <div className="itemInfo">
                  <div className="title">{item.name}</div>
                  <div className="subTitle">{item.city}</div>
                  <div className="price">
                    TWD {item.cheapestPrice.toLocaleString()} 起
                  </div>
                  <div className="rate">
                    <button>{item.rating}</button>
                    <span>{item.rating >= 4.5 ? "好極了" : "傑出"}</span>
                    <p>{item.comments.toLocaleString()}則評論</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default PopularHotels;
