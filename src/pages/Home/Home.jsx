import React from "react";
import Banner from "../../components/home/banner/Banner";
import PopularContests from "../../components/home/popularContest/PopularContext";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularContests></PopularContests>
    </div>
  );
};

export default Home;
