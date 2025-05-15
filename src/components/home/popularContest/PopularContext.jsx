import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaDollarSign, FaCalendarAlt, FaTrophy, FaArrowRight } from "react-icons/fa";
import RingLoader from "react-spinners/RingLoader";

const PopularContests = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: popular = [], isLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/contests/popular");
      return data;
    },
  });

  const handleGo = () => {
    navigate(`/all-contests`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <RingLoader color="#2563eb" size={80} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-950/70 to-slate-900/70 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">
            <span className="inline-block relative">
              Popular Contests
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-blue-100/80">
            Join our most exciting and trending competitions to showcase your talent and win amazing prizes
          </p>
        </div>

        {popular.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((contest, index) => (
              <div
                key={contest._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
                className="group bg-gradient-to-br from-blue-900/90 to-slate-800/90 rounded-xl overflow-hidden shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-800/30 transition-all duration-300 hover:translate-y-[-5px] border border-blue-700/20"
              >
                {/* Contest Image with Overlay */}
                <div className="relative overflow-hidden h-56">
                  <img
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    src={contest.image}
                    alt={contest.contestName}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent">
                    <div className="absolute bottom-3 left-4 flex items-center">
                      <FaUser className="mr-2 text-blue-300" />
                      <span className="text-white font-medium">
                        {contest.participantsCount || 0} Participants
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-4">
                      <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {contest.contestType || "Contest"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {contest.contestName}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {contest.description}
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-900/40 p-3 rounded-lg flex items-center">
                      <FaTrophy className="text-yellow-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-400">Prize</p>
                        <p className="text-white font-semibold">${contest.prizeMoney}</p>
                      </div>
                    </div>
                    <div className="bg-blue-900/40 p-3 rounded-lg flex items-center">
                      <FaCalendarAlt className="text-blue-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-400">Deadline</p>
                        <p className="text-white font-semibold">{new Date(contest.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <Link
                    to={`/all-contests/${contest._id}`}
                    className="w-full inline-block"
                  >
                    <button
                      aria-label={`View details of ${contest.contestName}`}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group-hover:shadow-blue-500/30"
                    >
                      View Details
                      <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-blue-900/30 border border-blue-800/40 rounded-xl p-8 text-center">
            <p className="text-xl text-blue-100">
              No popular contests available at the moment. Check back later!
            </p>
          </div>
        )}

        <div className="text-center mt-16" data-aos="fade-up" data-aos-duration="800">
          <button
            onClick={handleGo}
            aria-label="View all contests"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-blue-500/30 hover:scale-105"
          >
            Explore All Contests
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularContests;
