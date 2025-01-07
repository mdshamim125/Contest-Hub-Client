import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAuth from "../../../components/hooks/useAuth";
import { Helmet } from "react-helmet";
import RingLoader from "react-spinners/RingLoader";

const ContestSubmitted = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
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

  const { mutate : declareWinner } = useMutation(async (submissionId) => {
    await axiosSecure.post(
      `/contests/${selectedContestId}/submissions/${submissionId}/declare-winner`
    );
  });

  useEffect(() => {
    if (contestData) {
      setContests(contestData);
    }
  }, [contestData]);

  const handleContestClick = async (contestId) => {
    setSelectedContestId(contestId);
    const submissionsData = await fetchSubmissions(contestId);
    setSubmissions(submissionsData);
  };

  if (contestsLoading) {
    return <div className="flex justify-center items-center h-screen">
    <RingLoader color="#2563eb" size={100} />
  </div>;
  }

  const handleDeclareWinner = async (userId) => {
    declareWinner(userId);
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Contest Submitted | Dashboard</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6 text-white">Your Created Contests</h1>
      <ul className="space-y-4 mb-6">
        {contests?.map((contest) => (
          <li key={contest._id} className="p-4 bg-blue-950 text-white shadow rounded-lg">
            <h2 className="text-xl font-semibold">{contest.contestName}</h2>
            <p className="text-gray-600">Prize: {contest.prizeMoney}</p>
            <button
              onClick={() => handleContestClick(contest._id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Submissions
            </button>
          </li>
        ))}
      </ul>

      {selectedContestId && (
        <div>
          <h2 className="text-xl text-white font-bold mb-4">Submissions for Contest</h2>
          <ul className="space-y-4">
            {submissions?.map((submission) => (
              <li
                key={submission._id}
                className="p-4 bg-blue-950  shadow rounded-lg"
              >
                <p className="text-lg font-medium">
                  Name: {submission.userName}
                </p>
                <p className="text-white">Email: {submission.userEmail}</p>
                <p className="text-gray-600">
                  Submitted Task:{" "}
                  <a
                    href={submission.taskLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {submission?.taskLink}
                  </a>
                </p>
                {!submission?.isWinner && (
                  <button
                    onClick={() => handleDeclareWinner(submission?.userId)}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Declare Win
                  </button>
                )}
                {submission.isWinner && (
                  <p className="mt-4 text-green-500 font-semibold">Winner</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContestSubmitted;
