import useAxiosSecure from "./../../../components/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UserDataRow from "../../../components/dashboard/Sidebar/TableRows/UserDataRow";
import { Helmet } from "react-helmet";
import RingLoader from "react-spinners/RingLoader";
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

  // console.log(users);
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
        <title>Manage Users | Dashboard</title>
      </Helmet>
      <h1 className="text-2xl text-white font-bold text-center mt-6">
        Manage The Users Here
      </h1>
      <div className="container mx-auto px-4 sm:px-8">
        <Helmet>
          <title>Manage Users</title>
        </Helmet>
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200 text-white  text-left text-lg uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200 text-white  text-left text-lg uppercase font-normal"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200 text-white  text-left text-lg uppercase font-normal"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 text-center   border-b border-gray-200 text-white text-lg uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <UserDataRow
                      key={user?._id}
                      user={user}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUser;
