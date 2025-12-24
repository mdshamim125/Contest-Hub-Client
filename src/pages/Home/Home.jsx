import Banner from "../../components/home/banner/Banner";
import PopularContests from "../../components/home/popularContest/PopularContext";
import ContestCreators from "../../components/home/creator/ContestCreators";
import { Helmet } from "react-helmet";
import NewsletterSection from "../../components/home/newsletter/NewsletterSection";
import EasyStepsSection from "../../components/home/steps/EasyStepsSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Contest Hub</title>
      </Helmet>
      <Banner></Banner>
      <PopularContests></PopularContests>
      {/* <Advertise></Advertise> */}
      <ContestCreators></ContestCreators>
      <EasyStepsSection />
      <NewsletterSection />
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Home;
