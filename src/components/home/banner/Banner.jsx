const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold tracking-wide text-blue-400 bg-blue-400/10 rounded-full">
              All-in-One Contest Management Platform
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
              Manage, Judge &{" "}
              <span className="text-blue-400">Win Contests</span> Effortlessly
            </h1>

            <p className="text-gray-300 text-lg max-w-xl mb-8">
              Contest Hub is a powerful web platform that allows administrators,
              creators, and participants to manage contests, submit entries,
              declare winners, and track performance — all in real time.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/all-contests"
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg"
              >
                Explore Contests
              </a>
              <a
                href="/login"
                className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition font-semibold"
              >
                Get Started
              </a>
            </div>

            {/* Feature Highlights */}
            <div className="mt-10 grid grid-cols-2 gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">✔</span>
                Secure Authentication
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">✔</span>
                Role-Based Dashboards
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">✔</span>
                Real-Time Updates
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">✔</span>
                Winner Management
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                Platform Highlights
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex justify-between">
                  <span>Admin Dashboard</span>
                  <span className="text-green-400">Active</span>
                </li>
                <li className="flex justify-between">
                  <span>Creator Submissions</span>
                  <span className="text-green-400">Enabled</span>
                </li>
                <li className="flex justify-between">
                  <span>Winner Declaration</span>
                  <span className="text-green-400">Live</span>
                </li>
                <li className="flex justify-between">
                  <span>React Query Sync</span>
                  <span className="text-green-400">Real-Time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
