import React from "react";
import "./features/feature.css";
import { CategoriesCities, CategoriesType, PopularHotelsData } from "../data";
import Categories from "../subcomponents/Categories";
import PostCards from "../subcomponents/PostCards";
import PopularHotels from "../subcomponents/PopularHotels";
import useFetch from "../hooks/useFetch";

function Feature() {
  //const { data, loading, error } = useFetch("/hotels");
  const { data, loading, error } = useFetch("/hotels?popularHotel=true");
  console.log(data);

  const typeUrl = `/hotels/amountoftype?type=${CategoriesType.map(
    (type) => type.name
  )}`;
  const citiesUrl = `/hotels/amountofcities?cities=${CategoriesCities.map(
    (city) => city.name
  )}`;

  return (
    <div className="feature">
      <div className="container">
        <div className="listTitle">
          <h2>依住宿類型瀏覽</h2>
        </div>
        <div className="listItems">
          <Categories dataArray={CategoriesType} url={typeUrl} />
        </div>
        <div className="listItems">
          <PostCards />
        </div>
        <div className="listTitle">
          <h3>探索台灣</h3>
          <p>這些熱門目的地魅力無窮，等你來體驗！</p>
        </div>
        <div className="listItems">
          <Categories dataArray={CategoriesCities} url={citiesUrl} />
        </div>
        <div className="listTitle">
          <h2>人氣民宿、公寓類型住宿</h2>
        </div>
        <div className="listitem">
          <PopularHotels dataArray={data} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default Feature;
