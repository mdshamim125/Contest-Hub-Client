import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AdvertiseCard from "./AdvertiseCard";
import RingLoader from "react-spinners/RingLoader";
import { FaTrophy, FaAward, FaMedal } from "react-icons/fa";

const Advertise = () => {
  const axiosPublic = useAxiosPublic();

  const { data: advertise = [], isLoading } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/advertise");
      return data;
    },
  });

  // console.log(advertise);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <RingLoader color="#2563eb" size={80} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-900/90 to-blue-950/90 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-blue-500"></div>
            <FaTrophy className="text-yellow-500 text-4xl" />
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">
            <span className="inline-block relative">
              Contest Winners
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-blue-100/80">
            Celebrating excellence and recognizing our champions
          </p>
        </div>

        {advertise.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advertise.map((item, index) => (
              <div
                key={index}
                className="relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                {/* Trophy position indicator */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  {index === 0 ? (
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-gray-900 px-4 py-1 rounded-full shadow-lg flex items-center">
                      <FaMedal className="mr-1" /> 1st Place
                    </div>
                  ) : index === 1 ? (
                    <div className="bg-gradient-to-r from-gray-400 to-gray-300 text-gray-900 px-4 py-1 rounded-full shadow-lg flex items-center">
                      <FaMedal className="mr-1" /> 2nd Place
                    </div>
                  ) : index === 2 ? (
                    <div className="bg-gradient-to-r from-yellow-700 to-yellow-600 text-white px-4 py-1 rounded-full shadow-lg flex items-center">
                      <FaMedal className="mr-1" /> 3rd Place
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 rounded-full shadow-lg flex items-center">
                      <FaAward className="mr-1" /> Winner
                    </div>
                  )}
                </div>
                <AdvertiseCard advertise={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-blue-900/30 border border-blue-800/40 rounded-xl p-8 text-center">
            <p className="text-xl text-blue-100">
              No contest winners to display yet. Stay tuned for upcoming
              announcements!
            </p>
          </div>
        )}

        {/* Call to action */}
        <div
          className="mt-16 text-center"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <p className="text-xl text-blue-100 mb-6">
            Want to be the next winner? Participate in our contests today!
          </p>
          <a
            href="/all-contests"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-blue-500/30 hover:scale-105"
          >
            Explore Contests
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
