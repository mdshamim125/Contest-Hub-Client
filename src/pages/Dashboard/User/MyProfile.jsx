import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAuth from "../../../components/hooks/useAuth";
import "chart.js/auto";
import toast from "react-hot-toast";
import useRole from "../../../components/hooks/useRole";
import RingLoader from "react-spinners/RingLoader";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const { loggedInUser } = useRole();

  const [profileData, setProfileData] = useState({
    displayName: loggedInUser?.displayName || user?.displayName,
    profilePicture: loggedInUser?.photoURL || user?.photoURL,
    address: loggedInUser?.address || "",
  });

  const [winPercentage, setWinPercentage] = useState(0);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["profileStats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users/${loggedInUser?.email}/stats`
      );
      return data;
    },
  });

  useEffect(() => {
    if (stats) {
      const total = stats.attempted + stats.completed;
      const percentage = total ? (stats.completed / total) * 100 : 0;
      setWinPercentage(percentage.toFixed(2));
    }
  }, [stats]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axiosSecure.put(`/users/${loggedInUser?.email}`, profileData);
    await updateUserProfile(
      profileData.displayName,
      profileData.profilePicture
    );
    toast.success("Profile updated successfully");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <RingLoader color="#2563eb" size={80} />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="flex items-center gap-6 bg-blue-950/30 border border-blue-800/30 p-6 rounded-xl">
        <img
          src={profileData.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-600 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{profileData.displayName}</h1>
          <p className="text-sm text-blue-200">{loggedInUser?.email}</p>
          <p className="text-sm text-gray-300 mt-1">
            {profileData.address || "No address added"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Form */}
        <div className="bg-blue-950/20 border border-blue-800/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Display Name</label>
              <input
                name="displayName"
                value={profileData.displayName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-blue-800 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Profile Picture URL</label>
              <input
                name="profilePicture"
                value={profileData.profilePicture}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-blue-800 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Address</label>
              <input
                name="address"
                value={profileData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-blue-800 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-medium"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="bg-blue-950/20 border border-blue-800/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Contest Performance</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-300">Win Percentage</p>
            <p className="text-3xl font-bold text-blue-400">{winPercentage}%</p>
          </div>

          <Bar
            data={{
              labels: ["Win %"],
              datasets: [
                {
                  label: "Win Rate",
                  data: [winPercentage],
                  backgroundColor: "rgba(37, 99, 235, 0.5)",
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
