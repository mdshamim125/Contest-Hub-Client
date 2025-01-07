import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import { FaUserAlt, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import RingLoader from "react-spinners/RingLoader";

const AllContests = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedTag, setSelectedTag] = useState("All");

  const {
    data: contests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-contests");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }
  if (error) return <p>Error loading contests.</p>;

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>All Contest | Contest Hub</title>
      </Helmet>
      <h1 className="text-2xl text-center text-white font-bold my-4">
        All Contests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests?.map((contest) => (
          <div
            key={contest._id}
            className="bg-blue-950 p-2 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={contest.image}
              alt={contest.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-600">
                {contest.category}
              </h2>
              <p className="text-gray-600 mt-2">
                {contest.description.slice(0, 100)}...
              </p>

              <div className="flex items-center mt-4 text-gray-700">
                <FaUserAlt className="mr-2" />
                <span>{contest.participantsCount || 0} Participants</span>
              </div>

              <div className="flex items-center mt-2 text-gray-700">
                <FaMoneyBillWave className="mr-2" />
                <span>Prize: {contest.prizeMoney}</span>
              </div>

              <div className="flex items-center mt-2 text-gray-700">
                <FaCalendarAlt className="mr-2" />
                <span>
                  Deadline: {new Date(contest.deadline).toLocaleDateString()}
                </span>
              </div>

              <Link
                to={`/all-contests/${contest._id}`}
                className="block text-center w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContests;
