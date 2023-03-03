import React, { useEffect, useState } from "react";
import axois from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("useFetch被觸發了 我放上面");

  useEffect(() => {
    console.log("useEffect被觸發了");
    const fetchData = async () => {
      //確認連線
      setLoading(true);
      try {
        //連線抓取
        const response = await axois.get(url);
        //axios.get最重要的資料 且url是feature那邊傳入的/hotels
        setData(response.data);
      } catch (error) {
        //錯誤記錄在setError
        setError(false);
      }
      //連線成功
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log("useFetch被觸發了 我放下面");

  return { data, loading, error };
};

export default useFetch;
