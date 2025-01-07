import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
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
    queryKey: ["myParticipatedContests"],
    queryFn: fetchParticipatedContests,
  });

  useEffect(() => {
    if (data) {
      setContests(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }
  const handleGoing = () => {
    navigate(`/all-contests`);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-white">
        My Participated Contests
      </h1>
      <button className="btn btn-primary mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sort by Upcoming
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full text-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Contest Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Payment Status
              </th>
              <th className="border border-gray-300 px-4 py-2">Deadline</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests?.map((contest) => (
              <tr key={contest._id} className=" text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {contest.contestName}
                </td>
                <td className="border border-gray-300 px-4 py-2">Paid</td>
                <td className="border border-gray-300 px-4 py-2">
                  {contest.deadline ? (
                    <Countdown date={contest.deadline} />
                  ) : (
                    "Contest Ended"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    to={`/all-contests/${contest._id}`}
                    className="btn btn-sm btn-primary bg-blue-500 text-white font-bold py-2 px-4 rounded"
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
        onClick={handleGoing}
        className="btn bg-blue-500 hover:bg-blue-950 text-white text-center text-large w-full mt-4"
      >
        Participate More
      </button>
    </div>
  );
};

export default MyParticipatedContest;
