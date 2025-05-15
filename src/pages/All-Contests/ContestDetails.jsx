import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Countdown from "react-countdown";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import useAuth from "../../components/hooks/useAuth";
import { Helmet } from "react-helmet";
import {
  FaDollarSign,
  FaUsers,
  FaTrophy,
  FaClipboardList,
  FaRegClock,
  FaCalendarAlt,
  FaTags,
  FaMedal,
  FaArrowRight,
} from "react-icons/fa";
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
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  useEffect(() => {
    if (contest) {
      setParticipantsCount(contest.participantsCount || 0);
      setIsDeadlinePassed(new Date(contest.deadline) <= new Date());
    }
  }, [contest]);

  const handleRegister = (id) => {
    if (!user) {
      toast.error("Please login to register for this contest!");
      // Could redirect to login page here
      return;
    }
    navigate(`/payment/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <RingLoader color="#2563eb" size={80} />
      </div>
    );
  }

  if (error)
    return (
      <div className="container mx-auto p-6 md:p-8 min-h-screen pt-24">
        <div className="bg-red-900/30 border border-red-800/40 rounded-xl p-8 text-center">
          <p className="text-xl text-red-100">
            Error loading contest details. Please try again later.
          </p>
        </div>
      </div>
    );

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gradient-to-b from-blue-950/90 to-slate-900/90 py-20 min-h-screen">
      <Helmet>
        <title>{contest.contestName || "Contest Details"} | Contest Hub</title>
        <meta name="description" content={contest.description?.slice(0, 160)} />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 mb-12"
          data-aos="fade-up"
        >
          <div className="absolute inset-0">
            <img
              src={contest.image}
              alt={contest.contestName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/80 to-blue-900/30"></div>
          </div>

          <div className="relative py-20 px-6 md:px-12 text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-600/80 text-white text-sm font-medium mb-6">
              {contest.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto">
              {contest.contestName}
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center px-4 py-2 bg-black/30 rounded-full">
                <FaUsers className="text-blue-400 mr-2" />
                <span className="text-white">
                  {participantsCount} Participants
                </span>
              </div>
              <div className="flex items-center px-4 py-2 bg-black/30 rounded-full">
                <FaTrophy className="text-yellow-400 mr-2" />
                <span className="text-white">Prize: ${contest.prizeMoney}</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-black/30 rounded-full">
                <FaCalendarAlt className="text-blue-400 mr-2" />
                <span className="text-white">
                  Deadline: {formatDate(contest.deadline)}
                </span>
              </div>
            </div>

            {!isDeadlinePassed && (
              <div className="inline-block">
                <button
                  onClick={() => handleRegister(contest?._id)}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-lg rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-blue-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900"
                  disabled={isDeadlinePassed}
                >
                  Register Now
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contest Details */}
          <div className="lg:col-span-2 space-y-8">
            <div
              className="bg-gradient-to-br from-blue-900/90 to-slate-800/90 rounded-xl p-8 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaClipboardList className="mr-3 text-blue-400" />
                Contest Details
              </h2>
              <div className="prose prose-lg prose-invert max-w-none opacity-90">
                <p className="text-gray-200 leading-relaxed">
                  {contest.description}
                </p>
              </div>
            </div>

            <div
              className="bg-gradient-to-br from-blue-900/90 to-slate-800/90 rounded-xl p-8 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaClipboardList className="mr-3 text-blue-400" />
                Task Information
              </h2>
              <div className="bg-blue-950/50 p-6 rounded-lg border border-blue-800/30">
                <p className="text-gray-200">{contest.taskSubmission}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Contest Status Card */}
            <div
              className="bg-gradient-to-br from-blue-900/90 to-slate-800/90 rounded-xl p-6 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <FaRegClock className="mr-2 text-blue-400" />
                Contest Status
              </h3>

              <div className="bg-blue-950/50 p-6 rounded-lg border border-blue-800/30 text-center mb-4">
                {isDeadlinePassed ? (
                  <div className="text-red-400 font-semibold text-xl">
                    Contest has ended
                  </div>
                ) : (
                  <div>
                    <p className="text-blue-300 mb-2">Ends in:</p>
                    <Countdown
                      date={new Date(contest.deadline)}
                      renderer={({
                        days,
                        hours,
                        minutes,
                        seconds,
                        completed,
                      }) => {
                        if (completed) {
                          return (
                            <span className="text-red-400 text-2xl font-bold">
                              Contest has ended
                            </span>
                          );
                        } else {
                          return (
                            <div className="grid grid-cols-4 gap-2">
                              <div className="bg-blue-900/70 p-2 rounded">
                                <div className="text-white text-xl font-bold">
                                  {days}
                                </div>
                                <div className="text-blue-300 text-xs">
                                  Days
                                </div>
                              </div>
                              <div className="bg-blue-900/70 p-2 rounded">
                                <div className="text-white text-xl font-bold">
                                  {hours}
                                </div>
                                <div className="text-blue-300 text-xs">
                                  Hours
                                </div>
                              </div>
                              <div className="bg-blue-900/70 p-2 rounded">
                                <div className="text-white text-xl font-bold">
                                  {minutes}
                                </div>
                                <div className="text-blue-300 text-xs">
                                  Mins
                                </div>
                              </div>
                              <div className="bg-blue-900/70 p-2 rounded">
                                <div className="text-white text-xl font-bold">
                                  {seconds}
                                </div>
                                <div className="text-blue-300 text-xs">
                                  Secs
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {isDeadlinePassed ? (
                <div className="text-center bg-red-900/30 p-3 rounded-lg border border-red-800/30">
                  <p className="text-white">
                    Registration is closed for this contest
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => handleRegister(contest?._id)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group-hover:shadow-blue-500/30"
                  disabled={isDeadlinePassed}
                >
                  Register for ${contest.price}
                  <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              )}
            </div>

            {/* Contest Info Card */}
            <div
              className="bg-gradient-to-br from-blue-900/90 to-slate-800/90 rounded-xl p-6 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Contest Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaTags className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white">{contest.category}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaDollarSign className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Entry Fee</p>
                    <p className="text-white">${contest.price}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaTrophy className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Prize Money</p>
                    <p className="text-white">${contest.prizeMoney}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaUsers className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Participants</p>
                    <p className="text-white">{participantsCount}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaMedal className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Winner</p>
                    <p className="text-white">
                      {contest.winner?.name
                        ? contest.winner.name
                        : "Not announced yet"}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
