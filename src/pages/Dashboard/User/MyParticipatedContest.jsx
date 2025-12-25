import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAuth from "../../../components/hooks/useAuth";
import RingLoader from "react-spinners/RingLoader";

const MyParticipatedContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [contests, setContests] = useState([]);
  const navigate = useNavigate();

  const fetchParticipatedContests = async () => {
    const { data } = await axiosSecure.get(
      `/contests/my-participated/${user?.email}`
    );
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["myParticipatedContests", user?.email],
    queryFn: fetchParticipatedContests,
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (data) setContests(data);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <RingLoader color="#2563eb" size={80} />
      </div>
    );
  }

  if (contests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl px-8 py-10 max-w-md w-full text-center">
          <div className="flex justify-center mb-4 text-blue-400">
            <FaClock size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No Participated Contests Yet
          </h3>
          <p className="text-gray-300 mb-6">
            Start participating in contests to showcase your talent and track
            your progress!
          </p>
          <button
            onClick={() => navigate("/all-contests")}
            className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Explore Contests
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-4 md:px-8 py-10 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          📝 My Participated Contests
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Track all contests you’ve participated in along with deadlines,
          payment status, and quick access to contest details.
        </p>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-white border border-white/20 backdrop-blur-md rounded-xl shadow-lg">
          <thead className="bg-blue-600/80 text-white">
            <tr>
              <th className="px-6 py-3 rounded-tl-lg">#</th>
              <th className="px-6 py-3">Contest Name</th>
              <th className="px-6 py-3">Payment Status</th>
              <th className="px-6 py-3">Deadline</th>
              <th className="px-6 py-3 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr
                key={contest._id}
                className="border-b border-white/20 hover:bg-white/10 transition"
              >
                <td className="px-6 py-4 text-gray-200 font-medium text-center">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-white font-semibold">
                  {contest.contestName}
                </td>
                <td className="px-6 py-4 text-center">
                  {contest.isPaid ? (
                    <span className="flex items-center justify-center gap-1 text-green-400 font-medium">
                      <FaCheckCircle /> Paid
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1 text-red-400 font-medium">
                      <FaTimesCircle /> Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {contest.deadline ? (
                    <div className="flex items-center justify-center gap-1">
                      <FaClock /> <Countdown date={contest.deadline} />
                    </div>
                  ) : (
                    <span className="text-gray-400">Ended</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <Link
                    to={`/all-contests/${contest._id}`}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate("/all-contests")}
        className="btn w-full mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Participate More
      </button>
    </section>
  );
};

export default MyParticipatedContest;
