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
  FaAward,
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
    <section className="bg-gradient-to-b from-slate-900/90 to-blue-950/90 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-8 md:mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
            <div className="h-[2px] w-8 md:w-16 bg-gradient-to-r from-transparent to-blue-500"></div>
            <FaAward className="text-yellow-500 text-2xl md:text-4xl" />
            <div className="h-[2px] w-8 md:w-16 bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-3 md:mb-4">
            <span className="inline-block relative">
              Top Contest Creators
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-xl text-blue-100/80 px-4">
            Meet the creative minds behind our most successful contests
          </p>
        </div>

        {/* Creators Slider */}
        <Swiper
          spaceBetween={20}
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
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
          }}
        >
          {creators.map((creator, index) => (
            <SwiperSlide key={creator._id}>
              <div
                className="creator-card bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Creator Image Section */}
                  <div className="relative h-[300px] sm:h-[400px] lg:h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/20 z-10"></div>
                    <img
                      className="w-full h-full object-cover"
                      src={creator.creatorImage}
                      alt={creator.creatorName}
                    />
                    {/* Position Badge */}
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                      {index === 0 ? (
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-gray-900 px-4 md:px-6 py-1.5 md:py-2 rounded-full shadow-lg flex items-center font-semibold text-sm md:text-base">
                          <FaMedal className="mr-1.5 md:mr-2" /> 1st Place
                        </div>
                      ) : index === 1 ? (
                        <div className="bg-gradient-to-r from-gray-400 to-gray-300 text-gray-900 px-4 md:px-6 py-1.5 md:py-2 rounded-full shadow-lg flex items-center font-semibold text-sm md:text-base">
                          <FaMedal className="mr-1.5 md:mr-2" /> 2nd Place
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-yellow-700 to-yellow-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full shadow-lg flex items-center font-semibold text-sm md:text-base">
                          <FaMedal className="mr-1.5 md:mr-2" /> 3rd Place
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Creator Info Section */}
                  <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                        {creator.creatorName}
                      </h3>
                      <p className="text-gray-300 flex items-center text-sm md:text-base">
                        <FaInfoCircle className="text-blue-400 mr-2" />
                        Leading contests and building communities
                      </p>
                    </div>

                    {/* Contest Stats */}
                    <div className="space-y-4 md:space-y-6">
                      <div className="bg-white/5 rounded-lg md:rounded-xl p-4 md:p-6 border border-white/10">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg md:text-xl font-semibold text-white flex items-center">
                            <FaTrophy className="text-yellow-500 mr-2" />
                            Contests Created
                          </h4>
                          <span className="text-xl md:text-2xl font-bold text-blue-400">
                            {creator.contests.length}
                          </span>
                        </div>
                      </div>

                      {/* Display Top 3 Contests */}
                      {creator.contests.slice(0, 3).map((contest, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 rounded-lg md:rounded-xl p-4 md:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                          <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                            {contest.contestName}
                          </h4>
                          <p className="text-gray-300 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                            {contest.contestDescription}
                          </p>
                          <div className="flex items-center text-xs md:text-sm text-gray-400">
                            <FaUsers className="text-blue-400 mr-2" />
                            {contest.participantsCount} Participants
                          </div>
                        </div>
                      ))}
                    </div>
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
