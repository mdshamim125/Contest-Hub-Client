import React from "react";
import Banner from "../../components/home/banner/Banner";
import PopularContests from "../../components/home/popularContest/PopularContext";
import Footer from "../../components/home/footer/Footer";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularContests></PopularContests>
      <Footer></Footer>
    </div>
  );
};

export default Home;
