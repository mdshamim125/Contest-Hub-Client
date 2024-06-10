import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="contest-creators-section py-16">
      <h2 className="text-3xl font-bold text-center">Top Contest Creators</h2>
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
        {creators.map((creator) => (
          <SwiperSlide key={creator._id}>
            <div className="creator-card bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row justify-evenly items-center">
                <img
                  className="object-cover w-full md:w-1/3 h-48 md:h-96 rounded-t-lg md:rounded-lg"
                  src={creator.creatorImage}
                  alt={creator.creatorName}
                />
                <div className="creator-info p-4 md:pl-8">
                  <h3 className="text-2xl font-bold">{creator.creatorName}</h3>
                  {creator.contests.map((contest, index) => (
                    <div key={index} className="mt-4">
                      <h4 className="text-xl font-semibold text-gray-600">
                        {contest.contestName}
                      </h4>
                      <p className="font-medium text-gray-700 mt-2">
                        {contest.contestDescription.slice(0, 75)}...
                      </p>
                      <p className="text-gray-500 mt-2">
                        Participants: {contest.participantsCount}
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
