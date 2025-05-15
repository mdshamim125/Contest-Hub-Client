import useAxiosSecure from "./../../../components/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UserDataRow from "../../../components/dashboard/Sidebar/TableRows/UserDataRow";
import { Helmet } from "react-helmet";
import RingLoader from "react-spinners/RingLoader";
import { FaUsers } from "react-icons/fa";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  //   Fetch users Data
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <Helmet>
        <title>Manage Users | Dashboard</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-blue-500"></div>
            <FaUsers className="text-3xl text-blue-500" />
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              User Management
            </span>
          </h1>
          <p className="text-blue-100/80 text-lg">
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

        {/* Table Section */}
        <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-700/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-700/20">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center text-sm font-semibold text-blue-200 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-700/20">
                {users.map((user) => (
                  <UserDataRow key={user?._id} user={user} refetch={refetch} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
