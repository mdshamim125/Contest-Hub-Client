import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import CommentModal from "../../modals/CommentModal";
import { Helmet } from "react-helmet";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contests, refetch } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contests");
      return data;
    },
  });

  //   console.log(contests);

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/contests/${id}`);
      refetch();
    },
    onSuccess: () => {
      toast.success("Contest deleted successfully!");
      queryClient.invalidateQueries(["contests"]);
    },
  });

  const { mutateAsync: confirmation } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/contests/confirm/${id}`);
      refetch();
    },
    onSuccess: () => {
      toast.success("Contest confirmed successfully!");
      queryClient.invalidateQueries(["contests"]);
    },
  });

  const [selectedContest, setSelectedContest] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (contest) => {
    setIsOpen(true);
    setSelectedContest(contest);
  };

  //  Handle Delete
  const handleDelete = async (id) => {
    // console.log(id);
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
          refetch();
          if (deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // toast.success("deleted successfully");
          }
        } catch (err) {
          //   console.log(err);
        }
      }
    });
  };

  const handleConfirmContest = async (id) => {
    await confirmation(id);
    refetch();
  };

  return (
    <div className="p-4 text-white">
      <Helmet>
        <title>Manage Contests | Dashboard</title>
      </Helmet>
      <h1 className="text-3xl text-center font-bold my-6">Manage Contests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-center font-medium text-white uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-center font-medium text-white uppercase tracking-wider">
                Creator
              </th>
              <th className="px-6 py-3 text-center font-medium text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {contests?.map((contest) => (
              <tr key={contest._id} className="text-center">
                <td className="px-6 py-4 whitespace-nowrap">
                  {contest.contestName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {contest.creator.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {contest.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(contest._id)}
                    className="text-red-600 btn hover:text-red-900 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleConfirmContest(contest._id)}
                    className="text-green-600 btn hover:text-green-900 mr-2"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => openModal(contest._id)}
                    className="text-blue-600 btn hover:text-blue-900"
                  >
                    Comment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
