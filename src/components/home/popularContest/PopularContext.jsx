import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaDollarSign } from "react-icons/fa";

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-center text-white font-bold text-3xl my-12">Popular Contests</h2>
      <div className="grid gap-6 mt-8 lg:grid-cols-3">
        {popular.map((contest) => (
          <div
            key={contest._id}
            className="bg-blue-950 p-2 rounded-lg shadow-lg  overflow-hidden"
          >
            <img
              className="w-full h-48 object-cover"
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
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {contest.description.slice(0, 100)}...
              </p>
              <Link
                to={`/all-contests/${contest._id}`}
                className="mt-4 inline-block"
              >
                <button className="btn btn-primary font-bold text-lg">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleGo}
          className="btn btn-primary text-center mt-4 text-lg font-bold"
        >
          Show All
        </button>
      </div>
    </div>
  );
};

export default PopularContests;
