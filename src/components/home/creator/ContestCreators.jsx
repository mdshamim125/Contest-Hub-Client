import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
  FaTrophy,
  FaUsers,
  FaInfoCircle,
  FaStar,
  FaMedal,
} from "react-icons/fa";
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
      <div className="flex justify-center items-center h-[40vh]">
        <RingLoader color="#2563eb" size={80} />
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-slate-900/90 to-blue-950/90 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-blue-500"></div>
            <FaStar className="text-yellow-500 text-4xl" />
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">
            <span className="inline-block relative">
              Top Contest Creators
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-blue-100/80">
            Meet the creative minds behind our most successful contests
          </p>
        </div>

        {/* Creators Slider */}
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
          {creators.map((creator, index) => (
            <SwiperSlide key={creator._id}>
              <div
                className="creator-card grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-blue-900/90 to-slate-800/90 rounded-xl shadow-xl overflow-hidden border border-blue-700/20 hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                {/* Creator Image Section */}
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <img
                    className="object-cover w-full h-[500px] transition-transform duration-500 transform hover:scale-110"
                    src={creator.creatorImage}
                    alt={creator.creatorName}
                  />
                  {/* Position Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    {index === 0 ? (
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-gray-900 px-4 py-1 rounded-full shadow-lg flex items-center">
                        <FaMedal className="mr-1" /> 1st Place
                      </div>
                    ) : index === 1 ? (
                      <div className="bg-gradient-to-r from-gray-400 to-gray-300 text-gray-900 px-4 py-1 rounded-full shadow-lg flex items-center">
                        <FaMedal className="mr-1" /> 2nd Place
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-yellow-700 to-yellow-600 text-white px-4 py-1 rounded-full shadow-lg flex items-center">
                        <FaMedal className="mr-1" /> 3rd Place
                      </div>
                    )}
                  </div>
                </div>

                {/* Creator Info Section */}
                <div className="creator-info flex flex-col justify-center px-6 md:px-8 lg:px-12 py-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                    {creator.creatorName}
                  </h3>
                  <p className="text-gray-300 mb-6 flex items-center">
                    <FaInfoCircle className="text-blue-500 mr-2" />
                    Leading contests and building communities.
                  </p>

                  {/* Contest Stats */}
                  <div className="space-y-6">
                    <div className="bg-blue-950/50 rounded-lg p-4 shadow-lg transition-all hover:bg-blue-900/50 border border-blue-700/20">
                      <h4 className="text-xl font-semibold text-blue-400 flex items-center">
                        <FaTrophy className="text-yellow-500 mr-2" /> Contests
                        Created
                      </h4>
                      <p className="text-gray-300 mt-2">
                        {creator.contests.length} Contests
                      </p>
                    </div>

                    {/* Display Top 3 Contests */}
                    {creator.contests.slice(0, 3).map((contest, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-950/50 rounded-lg p-4 shadow-lg transition-all hover:bg-blue-900/50 border border-blue-700/20"
                      >
                        <h4 className="text-xl font-semibold text-blue-400 flex items-center">
                          <FaTrophy className="text-yellow-500 mr-2" />{" "}
                          {contest.contestName}
                        </h4>
                        <p className="text-gray-300 mt-2 line-clamp-2">
                          {contest.contestDescription}
                        </p>
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
      </div>
    </section>
  );
};

export default ContestCreators;
