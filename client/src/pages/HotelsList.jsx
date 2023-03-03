import React, { useState } from "react";
import "./hotelsLists/hotelsList.css";

import Navbar from "../components/Navbar";
import SearchItem from "../components/SearchItem";

import { format } from "date-fns";
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";

import { useLocation } from "react-router-dom";

const HotelList = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openConditions, setOpenConditions] = useState(false);

  const locationSearchBarData = useLocation();
  console.log(locationSearchBarData);

  const [dates, setDates] = useState(locationSearchBarData.state?.dates);
  const [destination, setDestination] = useState(
    locationSearchBarData.state?.destination
  );
  const [conditions, setConditions] = useState(
    locationSearchBarData.state?.conditions
  );

  return (
    <div>
      <Navbar />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="searchTitle">搜尋</div>
            <div className="listItem">
              <label>目的地 / 住宿名稱:{destination}</label>
              <input
                type="text"
                className="searchInput"
                placeholder={destination === "" ? "要去哪裡？" : destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="listItem">
              <label>
                入住/退房時間{format(dates[0].startDate, "MM/dd/yyyy")} -{" "}
                {format(dates[0].endDate, "MM/dd/yyyy")}
              </label>
              <span className="dates">
                <div
                  className="searchInput"
                  onClick={() => setOpenCalendar(!openCalendar)}
                >
                  入住時間 - 退房時間
                </div>
                {openCalendar && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                    locale={locales["zhTW"]}
                  />
                )}
              </span>
            </div>
            <div className="listItem">
              <div className="listItemLimitPrice">
                <span className="limitTitle">每晚最低價格</span>
                <input type="text" className="searchInput" />
              </div>
              <div className="listItemLimitPrice">
                <span className="limitSearch">每晚最高價格</span>
                <input type="text" className="searchInput" />
              </div>
              <div className="listItemConditions">
                <span
                  className="SearchText"
                  onClick={() => setOpenConditions(!openConditions)}
                >
                  {conditions.adult}位成人 · {conditions.children}位小孩 ·{" "}
                  {conditions.room}間房間
                </span>
              </div>
            </div>
            <div className="listItem">
              <button className="searchbtn">搜尋</button>
            </div>
          </div>
          <div className="listResult">
            <div className="resultTitle">
              <h2>在台北找到505間房間</h2>
              <div className="map">
                <button>在地圖上顯示</button>
              </div>
            </div>
            <SearchItem active="active" />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
