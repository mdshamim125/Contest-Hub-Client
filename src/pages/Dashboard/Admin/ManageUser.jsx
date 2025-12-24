import { useState } from "react";
import useAxiosSecure from "./../../../components/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UserDataRow from "../../../components/dashboard/Sidebar/TableRows/UserDataRow";
import { Helmet } from "react-helmet";
import RingLoader from "react-spinners/RingLoader";
import { FaUsers } from "react-icons/fa";
import Pagination from "../../../components/Pagination";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <RingLoader color="#2563eb" size={80} />
      </div>
    );
  }

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <Helmet>
        <title>Manage Users | Dashboard</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-blue-500" />
            <FaUsers className="text-3xl text-blue-500" />
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            User Management
          </h1>
          <p className="text-blue-100/80">
            Manage user roles, status, and permissions
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/20">
            <h3 className="text-blue-400 text-2xl mb-1">{users.length}</h3>
            <p className="text-white/80">Total Users</p>
          </div>
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/20">
            <h3 className="text-blue-400 text-2xl mb-1">
              {users.filter((user) => user.role === "creator").length}
            </h3>
            <p className="text-white/80">Contest Creators</p>
          </div>
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/20">
            <h3 className="text-blue-400 text-2xl mb-1">
              {users.filter((user) => user.status === "Verified").length}
            </h3>
            <p className="text-white/80">Verified Users</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-700/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-700/20">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-200">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-700/20">
                {paginatedUsers.map((user) => (
                  <UserDataRow key={user._id} user={user} refetch={refetch} />
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
      </div>
    </div>
  );
};

export default ManageUser;
