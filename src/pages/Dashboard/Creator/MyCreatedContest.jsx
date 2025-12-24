import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../components/hooks/useAuth";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import RingLoader from "react-spinners/RingLoader";
import Pagination from "../../../components/Pagination";

const MyCreatedContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 5; // adjust items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch user contests
  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contests/user/${user?.email}`);
      return data;
    },
  });

  // Delete contest mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/contest/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      setCurrentPage(1);
      toast.success("Contest deleted successfully!");
    },
  });

  // Handle delete with confirmation
  const handleDelete = async (id) => {
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
        mutateAsync(id);
      }
    });
  };

  // Handle view submissions
  const handleViewSubmissions = (contestId) => {
    navigate(`/dashboard/contest-submitted`);
  };

  // Handle edit
  const handleEdit = (contestId) => {
    navigate(`/dashboard/contest-edit/${contestId}`);
  };

  // Pagination logic
  const totalPages = Math.ceil(contests.length / ITEMS_PER_PAGE);
  const paginatedContests = contests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Contests | Dashboard</title>
      </Helmet>

      <div className="p-4 lg:p-6 text-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            My Contests
          </h1>
          <p className="text-blue-200/70 mt-1">
            Manage, edit, and review your created contests
          </p>
        </div>

        {/* Table */}
        <div className="bg-blue-950/40 backdrop-blur-md border border-blue-800/30 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-900/40 text-blue-200 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left">Contest Name</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-800/30">
                {paginatedContests.length > 0 ? (
                  paginatedContests.map((contest) => (
                    <tr
                      key={contest._id}
                      className="hover:bg-blue-900/30 transition"
                    >
                      <td className="px-6 py-4 font-medium">
                        {contest.contestName}
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          contest.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : contest.status === "confirmed"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                        >
                          {contest.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-4 text-lg">
                          <button
                            disabled={contest?.status !== "pending"}
                            onClick={() => handleEdit(contest._id)}
                            className={`transition ${
                              contest?.status !== "pending"
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-blue-400 hover:text-blue-300"
                            }`}
                            title="Edit Contest"
                          >
                            <FiEdit />
                          </button>

                          <button
                            disabled={contest?.status !== "pending"}
                            onClick={() => handleDelete(contest._id)}
                            className={`transition ${
                              contest?.status !== "pending"
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-red-400 hover:text-red-300"
                            }`}
                            title="Delete Contest"
                          >
                            <FiTrash2 />
                          </button>

                          <button
                            onClick={() => handleViewSubmissions(contest._id)}
                            className="text-green-400 hover:text-green-300 transition"
                            title="View Submissions"
                          >
                            <FiEye />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* Empty State */
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-12 text-blue-300/70"
                    >
                      You haven’t created any contests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default MyCreatedContest;
