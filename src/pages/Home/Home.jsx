import React from "react";
import Banner from "../../components/home/banner/Banner";
import PopularContests from "../../components/home/popularContest/PopularContext";
import Footer from "../../components/home/footer/Footer";
import Advertise from "../../components/home/advertise/Advertise";
import ContestCreators from "../../components/home/creator/ContestCreators";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularContests></PopularContests>
      <Advertise></Advertise>
      <ContestCreators></ContestCreators>
      <Footer></Footer>
    </div>
  );
};

export default Home;
