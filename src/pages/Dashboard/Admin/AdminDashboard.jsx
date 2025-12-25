/* eslint-disable react/no-unescaped-entities */

import {
  FaUsers,
  FaUserTie,
  FaTrophy,
  FaCheckCircle,
  FaDollarSign,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import StatCard from "../../../components/dashboard/StatCard";

// =======================
// ADMIN DASHBOARD PAGE
// =======================
const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  // -----------------------
  // STATISTICS
  // -----------------------
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-statistics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data;
    },
  });

  console.log(stats);

  // -----------------------
  // WEEKLY CONTESTS
  // -----------------------
  const { data: weeklyContests = [] } = useQuery({
    queryKey: ["weekly-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics/weekly-contests");
      return res.data;
    },
  });

  // -----------------------
  // MONTHLY USERS
  // -----------------------
  const { data: monthlyUsers = [] } = useQuery({
    queryKey: ["monthly-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics/monthly-users");
      return res.data;
    },
  });

  // -----------------------
  // MONTHLY REVENUE
  // -----------------------
  const { data: monthlyRevenue = [] } = useQuery({
    queryKey: ["monthly-revenue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics/monthly-revenue");
      return res.data;
    },
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 lg:px-12 py-10">
      {/* ================= HEADER ================= */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Monitor platform performance, user growth, contest activity, and
          revenue insights in real time.
        </p>
      </div>

      {/* ================= ADMIN STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-14">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FaUsers}
          accent="bg-blue-500"
        />

        <StatCard
          title="Total Creators"
          value={stats.totalCreators}
          icon={FaUserTie}
          accent="bg-indigo-500"
        />

        <StatCard
          title="Total Contests"
          value={stats.totalContests}
          icon={FaTrophy}
          accent="bg-purple-500"
        />

        <StatCard
          title="Confirmed Contests"
          value={stats.confirmedContests}
          icon={FaCheckCircle}
          accent="bg-emerald-500"
        />

        <StatCard
          title="Total Revenue ($)"
          value={stats.totalRevenue}
          icon={FaDollarSign}
          accent="bg-amber-500"
        />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Weekly Contests */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Weekly Contest Creation
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={weeklyContests}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Users */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Monthly User Growth
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyUsers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">
            Monthly Revenue
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#facc15"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
