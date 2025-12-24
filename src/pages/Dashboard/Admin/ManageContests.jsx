import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import CommentModal from "../../modals/CommentModal";
import { Helmet } from "react-helmet";
import { FaClipboardList } from "react-icons/fa";
import Pagination from "../../../components/Pagination";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: contests = [], refetch } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contests");
      return data;
    },
  });

  const totalPages = Math.ceil(contests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContests = contests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const { mutateAsync: deleteContest } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/contests/${id}`);
    },
    onSuccess: () => {
      toast.success("Contest deleted successfully");
      refetch();
    },
  });

  const { mutateAsync: confirmContest } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/contests/confirm/${id}`);
    },
    onSuccess: () => {
      toast.success("Contest confirmed");
      refetch();
    },
  });

  const [selectedContest, setSelectedContest] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This contest will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContest(id);
      }
    });
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Manage Contests | Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-blue-500" />
          <FaClipboardList className="text-3xl text-blue-400" />
          <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-blue-500" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Manage Contests</h1>
        <p className="text-blue-100/80">
          Review, approve, or remove submitted contests
        </p>
      </div>

      {/* Table */}
      <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-700/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-700/20">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">
                  Contest
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">
                  Creator
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-blue-200">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-blue-200">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-blue-700/20">
              {paginatedContests.map((contest) => (
                <tr key={contest._id} className="hover:bg-blue-900/20">
                  <td className="px-6 py-4 text-white">
                    {contest.contestName}
                  </td>
                  <td className="px-6 py-4 text-blue-100/80">
                    {contest.creator?.email}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contest.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {contest.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleDelete(contest._id)}
                      className="px-3 py-1 text-sm text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => confirmContest(contest._id)}
                      className="px-3 py-1 text-sm text-green-400 hover:text-green-300"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => {
                        setSelectedContest(contest);
                        setIsOpen(true);
                      }}
                      className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300"
                    >
                      Comment
                    </button>
                  </td>
                </tr>
              ))}
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

      {/* Modal */}
      {isOpen && (
        <CommentModal
          contest={selectedContest}
          closeModal={() => setIsOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManageContests;
