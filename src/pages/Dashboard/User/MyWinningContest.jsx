import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAuth from "../../../components/hooks/useAuth";
import RingLoader from "react-spinners/RingLoader";
import { FaTrophy, FaExternalLinkAlt } from "react-icons/fa";

const MyWinningContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [wonContests, setWonContests] = useState([]);
  const navigate = useNavigate();

  const fetchWonContests = async () => {
    const { data } = await axiosSecure.get(`/contests/won-by/${user?.email}`);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["wonContests", user?.email],
    queryFn: fetchWonContests,
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (data) {
      setWonContests(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <RingLoader color="#2563eb" size={80} />
      </div>
    );
  }

  return (
    <section className="min-h-screen px-4 md:px-8 py-10 bg-gradient-to-br from-slate-900 to-slate-800">
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          🏆 My Winning Contests
        </h1>
        <p className="text-gray-400 max-w-2xl">
          View all the contests you’ve won, access your winning submissions, and
          celebrate your achievements.
        </p>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto">
        {wonContests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wonContests.map((contest) => {
              const winningSubmission = contest.submissions?.find(
                (sub) => sub.isWinner
              );

              return (
                <div
                  key={contest._id}
                  className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Trophy Icon */}
                  <div className="absolute top-4 right-4 text-yellow-400">
                    <FaTrophy size={22} />
                  </div>

                  <h2 className="text-xl font-semibold text-white mb-2">
                    {contest.contestName}
                  </h2>

                  <p className="text-gray-300 mb-4">
                    <span className="font-medium text-white">Prize:</span>{" "}
                    {contest.prize}
                  </p>

                  {winningSubmission && (
                    <a
                      href={winningSubmission.taskLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
                    >
                      View Winning Submission
                      <FaExternalLinkAlt size={14} />
                    </a>
                  )}

                  <Link
                    to={`/contests/${contest._id}`}
                    className="block mt-4 text-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  >
                    View Contest Details
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl px-8 py-10 max-w-md w-full text-center">
              <div className="flex justify-center mb-4 text-yellow-400">
                <FaTrophy size={40} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                No Winning Contests Yet
              </h3>

              <p className="text-gray-300 mb-6">
                Participate in contests, showcase your talent, and your next win
                could be just around the corner!
              </p>

              <button
                onClick={() => navigate("/all-contests")}
                className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Explore Contests
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyWinningContest;
