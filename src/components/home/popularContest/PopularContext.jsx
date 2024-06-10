import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";

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
    navigate(`/all-contests`)
  };

  // console.log(popular);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white">
        Popular Contests
      </h2>
      <div className="grid gap-6 mt-8 lg:grid-cols-3">
        {popular.map((contest) => (
          <div
            key={contest.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
          >
            <img
              className="w-full h-48 object-cover"
              src={contest.image}
              alt={contest.contestName}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {contest.contestName}
              </h3>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Participants: {contest.participantsCount}
              </p>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {contest.description.slice(0, 100)}...
              </p>
              <Link
                to={`/all-contests/${contest._id}`}
                className="mt-4 inline-block  text-center text-blue-500 hover:underline"
              >
                <button className="btn font-bold text-lg btn-primary">
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
