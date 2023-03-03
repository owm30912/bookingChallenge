import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Announcement from "../components/Announcement";
import Feature from "../components/Feature";
import Footer from "../components/Footer";

import "./homes/home.css";

const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Announcement type={"Upper half"} />
      <Feature />
      <Announcement type={"Lower half"} />
      <Footer />
    </div>
  );
};

export default Home;
