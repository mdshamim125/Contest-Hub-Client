import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
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
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-6">
      <h2 className="text-center text-white font-bold text-3xl my-12">
        Popular Contests
      </h2>

      {popular.length > 0 ? (
        <div className="grid gap-6 mt-8 lg:grid-cols-3">
          {popular.map((contest) => (
            <div
              key={contest._id}
              className="bg-blue-950 p-2 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={contest.image}
                alt={contest.contestName}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {contest.contestName}
                </h3>
                <p className="flex items-center text-gray-600 dark:text-gray-400 mt-2">
                  <FaUser className="mr-2 text-blue-500" />
                  Participants: {contest.participantsCount || 0}
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-400 mt-2">
                  <FaDollarSign className="mr-2 text-green-500" />
                  Prize Money: {contest.prizeMoney}
                </p>
                <div className="flex items-center mt-2 text-gray-600">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  <span>
                    Deadline: {new Date(contest.deadline).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {contest.description.slice(0, 100)}...
                </p>
                <Link
                  to={`/all-contests/${contest._id}`}
                  className="mt-4 inline-block"
                >
                  <button
                    aria-label={`View details of ${contest.contestName}`}
                    className="px-6 py-2 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-8">
          No popular contests available at the moment. Check back later!
        </p>
      )}

      <div className="text-center">
        <button
          onClick={handleGo}
          aria-label="View all contests"
          className="px-6 py-2 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mt-8"
        >
          Show All
        </button>
      </div>
    </div>
  );
};

export default PopularContests;
