import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAuth from "../../../components/hooks/useAuth";

const MyWinningContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [wonContests, setWonContests] = useState([]);
  const navigate = useNavigate();

  const fetchWonContests = async () => {
    const { data } = await axiosSecure.get(`/contests/won-by/${user?.email}`);
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["wonContests"],
    queryFn: fetchWonContests,
  });

  useEffect(() => {
    if (data) {
      setWonContests(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleGo = () => {
    navigate(`/all-contests/`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Winning Contests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wonContests.length > 0 ? (
          wonContests.map((contest) => (
            <div
              key={contest._id}
              className="p-6 bg-white border rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">
                {contest.contestName}
              </h2>
              <p className="text-gray-600 mb-4">Prize: {contest.prize}</p>
              <p className="text-gray-600 mb-4">
                Winning Submission:{" "}
                <a
                  href={
                    contest.submissions.find((sub) => sub.isWinner)?.taskLink
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Submission
                </a>
              </p>
              <Link
                to={`/contests/${contest._id}`}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Contest Details
              </Link>
            </div>
          ))
        ) : (
          <div>
            <div>
              <p className="text-xl ">
                You didn't win any contest. <br />
                Good luck for you for the next time.
              </p>
            </div>
            <button onClick={handleGo} className="btn my-2">
              Participate More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWinningContest;
