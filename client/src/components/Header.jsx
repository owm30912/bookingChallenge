import React, { useState } from "react";
import "./headers/header.css";

import {
  faBed,
  faCalendar,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
//用它來叫出不同版本的語言翻譯，把日曆換成中文
import * as locales from "react-date-range/dist/locale";
import { DateRange } from "react-date-range";

import format from "date-fns/format";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [openConditions, setOpenConditions] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [destination, setDestination] = useState("");
  const [dates, setdates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [conditions, setConditions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  console.log(destination, dates, conditions);
  const handleSearchBarSubmit = () => {
    //state為固定用法
    navigate("/hotelsList", { state: { destination, dates, conditions } });
  };

  const handleCounter = (name, sign) => {
    setConditions((prev) => {
      return {
        ...prev,
        [name]:
          sign === "increase" ? conditions[name] + 1 : conditions[name] - 1,
      };
    });
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <h1 className="headerTitle">尋找下趟住宿</h1>
        <p className="headerDes">
          搜尋飯店、民宿及其他住宿類型的優惠…
          <br />
          Booking.com clone挑戰（為SamKo Demo使用不為盈利）
        </p>
        <div className="headerSearchBar">
          <div className="SearchBarItem">
            <FontAwesomeIcon icon={faBed} />
            <input
              type="Search"
              placeholder="要去哪裡？"
              className="SearchInput"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="SearchBarItem">
            <FontAwesomeIcon
              icon={faCalendar}
              onClick={() => setOpenCalendar(!openCalendar)}
            />
            <span
              className="SearchText"
              onClick={() => setOpenCalendar(!openCalendar)}
            >
              {format(dates[0].startDate, "MM/dd/yyyy")} -{" "}
              {format(dates[0].endDate, "MM/dd/yyyy")}
            </span>
            {openCalendar && ( //&&表示 openCalendar = true後面執行 false後面不執行
              <DateRange
                editableDateInputs={true} //可以讓日期被選取並輸入等等的
                onChange={(item) => setdates([item.selection])}
                //onChange把紀錄到的改動都紀錄到state date 裡面我們暫存器就會有選好的日期範圍，等於是輸入到暫存器
                //item.selection的概念就是讓他選擇上傳到key=selection的部分，因為
                moveRangeOnFirstSelection={false}
                className="calendar" //並記得classname scss styling導入
                minDate={new Date()}
                //可以選範圍並範圍更改會re-render
                //useState的date等於這是個抓取date範圍並顯示在日曆上，等於是從暫存器輸入到日曆顯示上面
                ranges={dates}
                locale={locales["zhTW"]}
                //最後這邊就是語言版本使用繁體中文zhTW概念
                //就可以用到上面的import * as locales from 'react-date-range/dist/locale';
              />
            )}
          </div>
          <div className="SearchBarItem">
            <FontAwesomeIcon
              icon={faPeopleGroup}
              onClick={() => setOpenConditions(!openConditions)}
            />
            <span
              className="SearchText"
              onClick={() => setOpenConditions(!openConditions)}
            >
              {conditions.adult}位成人 · {conditions.children} 位小孩 ·{" "}
              {conditions.room} 間房
            </span>
            {openConditions && (
              <div className="ConditionsContainer">
                <div className="condition">
                  成人
                  <div className="conditionCounter">
                    <button
                      className="conditionCounterButton"
                      onClick={() => handleCounter("adult", "decrease")}
                      disabled={conditions.adult <= 1}
                    >
                      -
                    </button>
                    <span className="number">{conditions.adult}</span>
                    <button
                      className="conditionCounterButton"
                      onClick={() => handleCounter("adult", "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="condition">
                  <span>
                    小孩
                    <p>0-17 歲</p>
                  </span>
                  <div className="conditionCounter">
                    <button
                      className="conditionCounterButton"
                      onClick={() => handleCounter("children", "decrease")}
                      disabled={conditions.children <= 0}
                    >
                      -
                    </button>
                    <span className="number">{conditions.children}</span>
                    <button
                      className="conditionCounterButton"
                      onClick={() => handleCounter("children", "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="condition">
                  房間
                  <div className="conditionCounter">
                    <button
                      className="conditionCounterButton"
                      onClick={() => handleCounter("room", "decrease")}
                      disabled={conditions.room <= 1}
                    >
                      -
                    </button>
                    <span className="number">{conditions.room}</span>
                    <button
                      className="conditionCounterButton"
                      onClick={() => handleCounter("room", "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="SearchBarBtn" onClick={handleSearchBarSubmit}>
            搜尋
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
