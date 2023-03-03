import React from "react";
import "./categoriess/categories.css";
import useFetch from "../hooks/useFetch";
import Skeleton from "../components/Skeleton";

const Categories = ({ dataArray, url }) => {
  const { data, loading, error } = useFetch(url);
  // const isloading = true;

  return (
    <div className="catogories">
      {dataArray.map((item, index) => (
        <div className="item" key={index}>
          <img src={item.img} alt="" />
          <div className="itemItfo">
            <div className="tltle">{item.name}</div>
            {loading ? (
              <Skeleton type="Amount" />
            ) : (
              <>
                <div className="desc">{`${data[index]}間住宿`}</div>
              </>
            )}
          </div>
        </div>
      ))}
      )}
    </div>
  );
};

export default Categories;
