import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import useAuth from "../../../components/hooks/useAuth";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const MyCreatedContest = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  //   Fetch Rooms Data
  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contests", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/contests/user/${user?.email}`);

      return data;
    },
  });

  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosPublic.delete(`/contests/${id}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
    },
  });

  //  Handle Delete
  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          mutateAsync(id);
          if (deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // toast.success("deleted successfully");
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  // Handle view submissions
  const handleViewSubmissions = (contestId) => {
    navigate(`/dashboard/contest-submitted`);
  };

  return (
    <>
      <Helmet>
        <title>My Contests | Dashboard</title>
      </Helmet>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">My Contests</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr key={contest.id} className="text-center">
                  <td className="py-2 px-4 border-b">{contest.contestName}</td>
                  <td className="py-2 px-4 border-b">{contest.status}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    {contest.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleEdit(contest.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(contest._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                    {contest.status !== "pending" && (
                      <span className="text-gray-400 cursor-not-allowed">
                        <FiEdit />
                        <FiTrash2 />
                      </span>
                    )}
                    <button
                      onClick={() => handleViewSubmissions(contest.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyCreatedContest;
