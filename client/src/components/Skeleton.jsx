import React from "react";
import "./skeletons/skeleton.scss";

const Skeleton = ({ type, length }) => {
  const number = length;

  //熱門飯店載入畫面
  const PopularHotelSkeleton = ({ i }) => (
    <div className="popularHotelSK" key={i}>
      <div className="imgSK" />
      <div className="InfoSK">
        <div className="titleSK" />
        <div className="subTitleSK" />
        <div className="priceSK" />
        <div className="rateAndCommentSK" />
      </div>
    </div>
  );

  //類型數量載入畫面
  const AmountSkeleton = ({ length }) => <div className="amountSK" />;

  //確認populatHotel有幾個以Array建立幾個遮罩
  if (type === "popularHotel") {
    return Array(number)
      .fill()
      .map((item, i) => <PopularHotelSkeleton key={i} />);
  }

  if (type === "Amount") {
    return <AmountSkeleton />;
  }
};

export default Skeleton;
