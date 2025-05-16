import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import {
  FaUserAlt,
  FaCalendarAlt,
  FaTrophy,
  FaArrowRight,
  FaTags,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import RingLoader from "react-spinners/RingLoader";
import Pagination from "../../components/Pagination";

const AllContests = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for upcoming, "desc" for past
  const contestsPerPage = 6;

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

  // Get unique categories from contests
  const categories = contests
    ? ["All", ...new Set(contests.map((contest) => contest.category))]
    : ["All"];

  // Filter and sort contests
  const filteredAndSortedContests = contests
    ? contests
        .filter((contest) => {
          return selectedTag === "All" || contest.category === selectedTag;
        })
        .sort((a, b) => {
          const dateA = new Date(a.deadline);
          const dateB = new Date(b.deadline);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        })
    : [];

  // Calculate pagination
  const indexOfLastContest = currentPage * contestsPerPage;
  const indexOfFirstContest = indexOfLastContest - contestsPerPage;
  const currentContests = filteredAndSortedContests.slice(
    indexOfFirstContest,
    indexOfLastContest
  );
  const totalPages = Math.ceil(
    filteredAndSortedContests.length / contestsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCurrentPage(1);
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
      <div className="container pt-24 mx-auto p-4 min-h-screen">
        <div className="bg-red-900/30 border border-red-800/40 rounded-xl p-8 text-center">
          <p className="text-xl text-red-100">
            Error loading contests. Please try again later.
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-blue-950/90 to-slate-900/90 pt-20 pb-16 min-h-screen">
      <Helmet>
        <title>All Contests | Contest Hub</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
            <span className="inline-block relative">
              Explore All Contests
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-blue-100/80">
            Discover various competitions and challenge yourself to win amazing
            prizes
          </p>
        </div>

        {/* Filter and Sort Section */}
        <div
          className="mb-10 bg-blue-900/30 p-6 rounded-xl shadow-lg"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center justify-center flex-wrap gap-3">
              <div className="flex items-center gap-2 mr-2">
                <FaTags className="text-blue-400" />
                <span className="text-white font-medium">Categories:</span>
              </div>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedTag(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === category
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-blue-900/40 text-gray-300 hover:bg-blue-800/60"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Button */}
            <button
              onClick={toggleSortOrder}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              {sortOrder === "asc" ? (
                <>
                  <FaSortAmountDown />
                  <span>Upcoming First</span>
                </>
              ) : (
                <>
                  <FaSortAmountUp />
                  <span>Past First</span>
                </>
              )}
            </button>
          </div>
        </div>

        {currentContests.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentContests.map((contest, index) => (
                <div
                  key={contest._id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                  data-aos-duration="800"
                  className="group bg-gradient-to-br from-blue-900/90 to-slate-800/90 rounded-xl overflow-hidden shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-800/30 transition-all duration-300 hover:translate-y-[-5px] border border-blue-700/20"
                >
                  {/* Contest Image with Overlay */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      src={contest.image}
                      alt={contest.contestName || contest.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent">
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {contest.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 flex items-center">
                        <FaUserAlt className="mr-2 text-blue-300" />
                        <span className="text-white font-medium">
                          {contest.participantsCount || 0} Participants
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                      {contest.contestName || contest.name}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {contest.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-900/40 p-3 rounded-lg flex items-center">
                        <FaTrophy className="text-yellow-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-400">Prize</p>
                          <p className="text-white font-semibold">
                            ${contest.prizeMoney}
                          </p>
                        </div>
                      </div>
                      <div className="bg-blue-900/40 p-3 rounded-lg flex items-center">
                        <FaCalendarAlt className="text-blue-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-400">Deadline</p>
                          <p className="text-white font-semibold">
                            {new Date(contest.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/all-contests/${contest._id}`}
                      className="w-full inline-block"
                    >
                      <button
                        aria-label={`View details of ${
                          contest.contestName || contest.name
                        }`}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group-hover:shadow-blue-500/30"
                      >
                        View Details
                        <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="bg-blue-900/30 border border-blue-800/40 rounded-xl p-8 text-center">
            <p className="text-xl text-blue-100">
              No contests found for this category. Please try another category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContests;
