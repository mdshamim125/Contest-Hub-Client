import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Countdown from "react-countdown";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import useAuth from "../../components/hooks/useAuth";

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
    // console.log("hi");
    navigate(`/payment/${id}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contest details.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{contest.contestName}</h1>
      <img
        src={contest.image}
        alt={contest.name}
        className="w-full h-[400px] object-cover mb-4"
      />
      <p className="text-lg text-gray-600">{contest.description}</p>
      <p className="text-medium text-gray-600">
        <span className="font-medium my-">Task: </span>
        {contest.taskSubmission}
      </p>
      <div className="font-medium my-2">
        <p>Contest Price: ${contest.price}</p>
        <p>Participants: {participantsCount}</p>
        <p>Prize Money: {contest.prizeMoney}</p>
        <p>
          Winner:{" "}
          {contest.winner?.name
            ? `${contest.winner.name} (${contest.winner.image})`
            : "Not decided yet"}
        </p>
      </div>
      <Countdown
        className="text-2xl font-medium"
        date={new Date(contest.deadline)}
      />
      <p>{new Date(contest.deadline) > new Date() ? "" : "Not available"}</p>
      <button
        onClick={() => handleRegister(contest?._id)}
        className="btn btn-primary mt-2 text-lg"
        disabled={new Date(contest.deadline) <= new Date()}
      >
        Register
      </button>
    </div>
  );
};

export default ContestDetails;
