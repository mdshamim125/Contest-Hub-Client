import React from "react";
import Banner from "../../components/home/banner/Banner";
import PopularContests from "../../components/home/popularContest/PopularContext";
import Footer from "../../components/home/footer/Footer";
import Advertise from "../../components/home/advertise/Advertise";
import ContestCreators from "../../components/home/creator/ContestCreators";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
       <Helmet>
        <title>Home | Contest Hub</title>
      </Helmet>
      <Banner></Banner>
      <PopularContests></PopularContests>
      <Advertise></Advertise>
      <ContestCreators></ContestCreators>
      <Footer></Footer>
    </div>
  );
};

export default Home;
