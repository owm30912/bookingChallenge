import React from "react";
import "./postCardss/postCards.css";
import { Attractions } from "../data";
import PostCard from "./PostCard";

const PostCards = () => {
  return (
    <div className="postcards">
      <div className="line">
        <PostCard dataArray={Attractions.slice(0, 2)} />
      </div>
      <div className="line">
        <PostCard dataArray={Attractions.slice(2.5)} />
      </div>
    </div>
  );
};

export default PostCards;
