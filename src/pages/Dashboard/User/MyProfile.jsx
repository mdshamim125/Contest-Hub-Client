import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAuth from "../../../components/hooks/useAuth";
import "chart.js/auto";
import toast from "react-hot-toast";
import useRole from "../../../components/hooks/useRole";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const { loggedInUser } = useRole();
  console.log(loggedInUser);
  const [profileData, setProfileData] = useState({
    displayName: loggedInUser?.displayName || user?.displayName,
    profilePicture: loggedInUser?.photoURL || user?.photoURL,
    address: loggedInUser?.address,
  });
  const [winPercentage, setWinPercentage] = useState(0);

  const fetchProfileStats = async () => {
    const { data } = await axiosSecure.get(
      `/users/${loggedInUser?.email}/stats`
    );
    return data;
  };

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["profileStats"],
    queryFn: fetchProfileStats,
  });

  const updateProfile = async (updatedData) => {
    const { data } = await axiosSecure.put(
      `/users/${loggedInUser?.email}`,
      updatedData
    );
    await updateUserProfile(loggedInUser?.displayName, loggedInUser?.photoURL);
    toast.success("User's information updated successfully");
    return data;
  };

  useEffect(() => {
    if (stats) {
      const totalContests = stats.attempted + stats.completed;
      const winPct =
        totalContests > 0 ? (stats.completed / totalContests) * 100 : 0;
      setWinPercentage(winPct.toFixed(2));
    }
  }, [stats]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await updateProfile(profileData);
  };

  if (statsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <form
            onSubmit={handleProfileUpdate}
            className="p-6 bg-white border rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={profileData.displayName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture URL
              </label>
              <input
                type="text"
                name="profilePicture"
                value={profileData.profilePicture}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>
        </div>
        <div className="p-6 bg-white border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Win Percentage</h2>
          <Bar
            data={{
              labels: ["Win Percentage"],
              datasets: [
                {
                  label: "Win %",
                  data: [winPercentage],
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
