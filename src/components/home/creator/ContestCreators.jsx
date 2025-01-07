import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaTrophy, FaUsers, FaInfoCircle } from "react-icons/fa";
import RingLoader from "react-spinners/RingLoader";

const ContestCreators = () => {
  const axiosPublic = useAxiosPublic();

  const { data: creators = [], isLoading } = useQuery({
    queryKey: ["creators"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/creators");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }

  return (
    <section className="container mx-auto py-16 text-white rounded-lg  px-6 md:px-8">
      <h2 className="text-center font-extrabold text-4xl mb-12 text-white">
        Top Contest Creators
      </h2>
      <Swiper
        spaceBetween={40}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {creators.map((creator) => (
          <SwiperSlide key={creator._id}>
            <div className="creator-card grid grid-cols-1 md:grid-cols-2 gap-8 bg-blue-950 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              {/* Creator Image Section */}
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  className="object-cover w-full h-[500px] transition-transform duration-500 transform hover:scale-110"
                  src={creator.creatorImage}
                  alt={creator.creatorName}
                />
                <div className="absolute inset-0 bg-black opacity-25 hover:opacity-0 transition-opacity duration-300"></div>
              </div>

              {/* Creator Info Section */}
              <div className="creator-info flex flex-col justify-center px-4 md:px-8 lg:px-12">
                <h3 className="text-3xl font-bold text-blue-400 mb-4">
                  {creator.creatorName}
                </h3>
                <p className="text-gray-300 mb-6 flex items-center">
                  <FaInfoCircle className="text-blue-500 mr-2" />
                  Leading contests and building communities.
                </p>

                {/* Contest List Section */}
                <div className="space-y-6">
                  <div className="bg-gray-700 bg-opacity-75 rounded-md p-4 shadow-lg transition-all hover:bg-opacity-90">
                    <h4 className="text-xl font-semibold text-blue-400 flex items-center">
                      <FaTrophy className="text-blue-500 mr-2" /> Contests Created
                    </h4>
                    <p className="text-gray-300 mt-2">
                      {creator.contests.length} Contests
                    </p>
                  </div>

                  {/* Display Top 3 Contests */}
                  {creator.contests.slice(0, 2).map((contest, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 bg-opacity-75 rounded-md p-4 shadow-lg transition-all hover:bg-opacity-90"
                    >
                      <h4 className="text-xl font-semibold text-blue-400 flex items-center">
                        <FaTrophy className="text-blue-500 mr-2" />{" "}
                        {contest.contestName}
                      </h4>
                      {/* <p className="text-gray-300 mt-2">
                        {contest.contestDescription.slice(0, 75)}...
                      </p> */}
                      <p className="text-gray-400 mt-2 flex items-center">
                        <FaUsers className="text-blue-500 mr-2" />{" "}
                        {contest.participantsCount} Participants
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ContestCreators;
