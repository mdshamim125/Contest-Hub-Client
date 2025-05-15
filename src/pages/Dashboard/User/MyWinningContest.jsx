import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAuth from "../../../components/hooks/useAuth";
import RingLoader from "react-spinners/RingLoader";

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
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }
  const handleGo = () => {
    navigate(`/all-contests/`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-700 drop-shadow-sm">
        My Winning Contests
      </h1>
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
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg px-8 py-10 max-w-md w-full text-center">
              <div className="flex justify-center mb-4">
                {/* Trophy Icon */}
                <svg
                  className="w-10 h-10 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 012 0v1h3a1 1 0 011 1v2a5 5 0 01-4 4.9V13h2a1 1 0 110 2H7a1 1 0 110-2h2V8.9A5 5 0 015 6V4a1 1 0 011-1h3V2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Winning Contests Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Keep participating in contests to showcase your skills and win
                exciting prizes.
                <br />
                Your next victory could be just around the corner!
              </p>
              <button
                onClick={handleGo}
                className="btn btn-primary w-full max-w-xs mx-auto"
              >
                Explore Contests
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWinningContest;
