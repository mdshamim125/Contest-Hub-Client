import React, { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";

const CommentModal = ({ contest, closeModal, refetch }) => {
  const [comment, setComment] = useState("");
  const axiosSecure = useAxiosSecure();
console.log(contest);
  const handleCommentSubmit = async () => {
    try {
      await axiosSecure.post(`/contests/comment/${contest}`, { comment });
      toast.success("Comment added successfully!");
      refetch();
      closeModal();
    } catch (error) {
      toast.error("Failed to add comment.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Comment</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        <div className="flex justify-end space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleCommentSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
