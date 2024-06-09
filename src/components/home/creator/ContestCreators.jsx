import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const ContestCreators = () => {
  const axiosPublic = useAxiosPublic();

  const { data: creators = [], isLoading } = useQuery({
    queryKey: ["creators"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/creators");
      return data;
    },
  });

  // console.log(creators);

  if (isLoading) return <p>Loading...</p>;
  return (
    <section className="contest-creators-section">
      <h2 className="text-3xl font-bold text-center mt-16 my-8">
        Top Contest Creators
      </h2>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {creators.map((creator, index) => (
          <SwiperSlide key={index}>
            <div className="creator-card bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center">
                <img
                  className="object-cover w-2/3 h-[550px] rounded-t-lg"
                  src={creator.image}
                  alt={creator.name}
                />
                <div className="creator-info p-4">
                  <h3 className="text-2xl font-bold">{creator.name}</h3>
                  <h4 className="text-xl font-semibold my-4 text-gray-600">
                    {creator.contestName}
                  </h4>
                  <p className="font-medium text-gray-700 mt-2">
                    {creator.contestDescription}
                  </p>
                  <p className="text-gray-500 mt-2">
                    Total Participants: {creator.participateCount}
                  </p>
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
