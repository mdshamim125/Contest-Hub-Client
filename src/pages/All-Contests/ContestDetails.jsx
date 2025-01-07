import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Countdown from "react-countdown";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import useAuth from "../../components/hooks/useAuth";
import { Helmet } from "react-helmet";
import { FaDollarSign, FaUsers, FaTrophy, FaClipboardList, FaRegClock } from "react-icons/fa";
import RingLoader from "react-spinners/RingLoader";

const ContestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: contest,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contests/${id}`);
      return data;
    },
  });

  const [participantsCount, setParticipantsCount] = useState(0);

  useEffect(() => {
    if (contest) {
      setParticipantsCount(contest.participantsCount || 0);
    }
  }, [contest]);

  const handleRegister = (id) => {
    navigate(`/payment/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }
  if (error) return <p className="text-center text-red-500">Error loading contest details.</p>;

  return (
    <div className="container mx-auto p-6 md:p-8 bg-blue-950 rounded-lg shadow-xl">
      <Helmet>
        <title>Contest Details | Contest Hub</title>
      </Helmet>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">{contest.contestName}</h1>
        <img
          src={contest.image}
          alt={contest.contestName}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-4"
        />
        <p className="text-lg text-blue-300 mb-4">{contest.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-900 p-6 rounded-lg shadow-lg space-y-4">
          <p className="flex items-center text-blue-300 text-xl">
            <FaClipboardList className="mr-2 text-blue-400" /> Task: {contest.taskSubmission}
          </p>
          <p className="flex items-center text-blue-300 text-xl">
            <FaDollarSign className="mr-2 text-blue-400" /> Contest Price: ${contest.price}
          </p>
          <p className="flex items-center text-blue-300 text-xl">
            <FaUsers className="mr-2 text-blue-400" /> Participants: {participantsCount}
          </p>
          <p className="flex items-center text-blue-300 text-xl">
            <FaTrophy className="mr-2 text-blue-400" /> Prize Money: ${contest.prizeMoney}
          </p>
          <p className="flex items-center text-blue-300 text-xl">
            <FaTrophy className="mr-2 text-blue-400" /> Winner:{" "}
            {contest.winner?.name ? `${contest.winner.name}` : "Not decided yet"}
          </p>
        </div>

        {/* Countdown and Status */}
        <div className="bg-blue-900 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-6">
          <p className="text-xl font-semibold text-blue-300 flex items-center">
            <FaRegClock className="mr-2 text-blue-400" /> Time Left:
          </p>
          <Countdown
            className="text-3xl font-bold text-blue-400"
            date={new Date(contest.deadline)}
            renderer={({ hours, minutes, seconds, completed }) => {
              if (completed) {
                return <span className="text-red-500">Contest has ended</span>;
              } else {
                return (
                  <span>
                    {hours}:{minutes}:{seconds}
                  </span>
                );
              }
            }}
          />
          <p
            className={`text-xl font-semibold ${
              new Date(contest.deadline) <= new Date() ? "text-red-500" : "text-blue-300"
            }`}
          >
            {new Date(contest.deadline) <= new Date() ? "Contest has ended" : ""}
          </p>
        </div>
      </div>

      {/* Register Button */}
      <div className="text-center">
        <button
          onClick={() => handleRegister(contest?._id)}
          className="btn btn-primary text-lg py-2 px-6 rounded-full hover:bg-blue-500"
          disabled={new Date(contest.deadline) <= new Date()}
        >
          {new Date(contest.deadline) <= new Date() ? "Registration Closed" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default ContestDetails;
