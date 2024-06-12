import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const AllContests = () => {
  const axiosPublic=useAxiosPublic()
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
       <Helmet>
        <title>All Contest | Contest Hub</title>
      </Helmet>
      <h1 className="text-2xl text-center font-bold my-4">All Contests</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(contests)?.map((contest) => (
          <div key={contest._id} className="card shadow-md">
            <img
              src={contest.image}
              alt={contest.name}
              className="card-img"
            />
            <div className="card-body">
              <h2 className="card-title">{contest.contestName}</h2>
              <p>Participants: {contest.participantsCount || 0}</p>
              <p>{contest.description.slice(0, 100)}...</p>
              <Link to={`/all-contests/${contest._id}`} className="btn font-bold btn-primary">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContests;
