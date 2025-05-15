import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAuth from "../../../components/hooks/useAuth";
import { Helmet } from "react-helmet";
import RingLoader from "react-spinners/RingLoader";
import {
  FiAward,
  FiUser,
  FiMail,
  FiFileText,
  FiCheck,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ContestSubmitted = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [contests, setContests] = useState([]);
  const [selectedContestId, setSelectedContestId] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const fetchContests = async () => {
    const { data } = await axiosSecure.get(
      `/contests/created-by/${user?.email}`
    );
    return data;
  };

  const fetchSubmissions = async (contestId) => {
    const { data } = await axiosSecure.get(
      `/contests/${contestId}/submissions`
    );
    return data;
  };

  const { data: contestData, isLoading: contestsLoading } = useQuery({
    queryKey: ["createdContests"],
    queryFn: fetchContests,
  });

  const declareWinnerMutation = useMutation({
    mutationFn: async (submissionId) => {
      // Check if there's already a winner
      const existingSubmissions = await fetchSubmissions(selectedContestId);
      const hasWinner = existingSubmissions.some((sub) => sub.isWinner);

      if (hasWinner) {
        throw new Error("This contest already has a winner!");
      }

      const response = await axiosSecure.post(
        `/contests/${selectedContestId}/submissions/${submissionId}/declare-winner`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Winner declared successfully!");
      queryClient.invalidateQueries(["createdContests"]);
      fetchSubmissions(selectedContestId).then((data) => setSubmissions(data));
    },
    onError: (error) => {
      console.error("Error declaring winner:", error);
      toast.error(
        error.message ||
          error.response?.data?.message ||
          "Failed to declare winner. Please try again."
      );
    },
  });

  useEffect(() => {
    if (contestData) {
      setContests(contestData);
    }
  }, [contestData]);

  const handleContestClick = async (contestId) => {
    setSelectedContestId(contestId);
    try {
      const submissionsData = await fetchSubmissions(contestId);
      setSubmissions(submissionsData);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to fetch submissions");
    }
  };

  const handleDeclareWinner = async (submission) => {
    // Check if there's already a winner in the current submissions
    const hasExistingWinner = submissions.some((sub) => sub.isWinner);

    if (hasExistingWinner) {
      Swal.fire({
        title: "Winner Already Declared",
        text: "This contest already has a winner. You cannot declare multiple winners for the same contest.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: "Declare Winner",
      text: "Are you sure you want to declare this participant as the winner? This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, declare winner",
    }).then((result) => {
      if (result.isConfirmed) {
        declareWinnerMutation.mutate(submission.userId);
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  if (contestsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }

  const getSelectedContest = () => {
    return contests.find((contest) => contest._id === selectedContestId);
  };

  const hasWinner = submissions.some((submission) => submission.isWinner);

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-blue-950 to-slate-900">
      <Helmet>
        <title>Contest Submissions | Dashboard</title>
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contests List */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FiFileText className="mr-2" />
              Your Contests
            </h2>
            <div className="space-y-4">
              {contests.map((contest) => (
                <div
                  key={contest._id}
                  onClick={() => handleContestClick(contest._id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedContestId === contest._id
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-2">
                    {contest.contestName}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <FiUser className="mr-1" />
                      <span>{contest.participantsCount || 0} Participants</span>
                    </div>
                    {contest.hasWinner && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full flex items-center">
                        <FiAward className="mr-1" /> Winner Declared
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="lg:col-span-2">
          {selectedContestId ? (
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {getSelectedContest()?.contestName} - Submissions
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">
                    Review and manage submissions for this contest
                  </p>
                  {hasWinner && (
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full flex items-center text-sm">
                      <FiAward className="mr-2" /> Winner Already Declared
                    </span>
                  )}
                </div>
              </div>

              {submissions.length > 0 ? (
                <div className="space-y-6">
                  {submissions.map((submission) => (
                    <div
                      key={submission._id}
                      className="bg-white/5 rounded-lg p-4 border border-gray-800"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FiUser className="text-blue-400" />
                            <span className="text-white font-medium">
                              {submission.userName}
                            </span>
                            {submission.isWinner && (
                              <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full flex items-center">
                                <FiAward className="mr-1" /> Winner
                              </span>
                            )}
                          </div>
                          <div className="text-gray-400 text-sm flex items-center gap-4">
                            <span className="flex items-center">
                              <FiMail className="mr-1" />
                              {submission.userEmail}
                            </span>
                            <span className="flex items-center">
                              <FiClock className="mr-1" />
                              {formatDate(submission.submittedAt)}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-300">
                            {submission.taskSubmission}
                          </p>
                        </div>
                        {!hasWinner && !submission.isWinner && (
                          <button
                            onClick={() => handleDeclareWinner(submission)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center"
                            disabled={declareWinnerMutation.isLoading}
                          >
                            {declareWinnerMutation.isLoading ? (
                              <span className="flex items-center">
                                <svg
                                  className="animate-spin h-5 w-5 mr-2"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </span>
                            ) : (
                              <>
                                <FiCheck className="mr-2" />
                                Declare Winner
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <FiFileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg">No submissions yet for this contest</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-gray-800 text-center py-12">
              <FiFileText className="mx-auto h-12 w-12 mb-4 text-gray-400 opacity-50" />
              <p className="text-lg text-gray-400">
                Select a contest to view its submissions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestSubmitted;
