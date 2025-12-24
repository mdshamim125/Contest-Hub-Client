import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaTrophy, FaUsers, FaAward } from "react-icons/fa";
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
    <section className="bg-gradient-to-b from-slate-900/90 to-blue-950/90 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header (Advertise-style) */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-blue-500" />
            <FaAward className="text-blue-400 text-4xl" />
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-blue-500" />
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">
            Contest Creators
          </h2>

          <p className="max-w-2xl mx-auto text-xl text-blue-100/80">
            Trusted creators driving innovation through competitive challenges
          </p>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator) => {
            const totalParticipants = creator.contests.reduce(
              (sum, contest) => sum + contest.participantsCount,
              0
            );

            return (
              <div
                key={creator._id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl"
              >
                {/* Creator Info */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={creator.creatorImage}
                    alt={creator.creatorName}
                    className="w-16 h-16 rounded-full object-cover border border-blue-500/30"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {creator.creatorName}
                    </h3>
                    <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                      Contest Creator
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-5" />

                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-blue-100">
                    <span className="flex items-center gap-2 text-sm">
                      <FaTrophy className="text-yellow-400" />
                      Contests Created
                    </span>
                    <span className="font-semibold">
                      {creator.contests.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-blue-100">
                    <span className="flex items-center gap-2 text-sm">
                      <FaUsers className="text-blue-400" />
                      Participants
                    </span>
                    <span className="font-semibold">
                      {totalParticipants}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ContestCreators;
