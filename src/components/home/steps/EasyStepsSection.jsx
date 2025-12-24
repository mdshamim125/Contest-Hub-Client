import {
  FiSearch,
  FiInfo,
  FiUserPlus,
  FiUsers,
  FiCreditCard,
  FiUpload,
  FiTrendingUp,
} from "react-icons/fi";

const steps = [
  {
    id: 1,
    title: "Browse Contests",
    desc: "Explore a wide range of active contests created by verified creators.",
    icon: <FiSearch />,
  },
  {
    id: 2,
    title: "View Contest Details",
    desc: "Check rules, deadlines, prize money, and submission requirements.",
    icon: <FiInfo />,
  },
  {
    id: 3,
    title: "Register / Login",
    desc: "Create an account or log in securely to participate.",
    icon: <FiUserPlus />,
  },
  {
    id: 4,
    title: "Join Contest",
    desc: "Join the contest you are interested in with a single click.",
    icon: <FiUsers />,
  },
  {
    id: 5,
    title: "Pay Entry Fee",
    desc: "Complete payment securely if the contest requires an entry fee.",
    icon: <FiCreditCard />,
  },
//   {
//     id: 6,
//     title: "Submit Your Work",
//     desc: "Upload your solution before the deadline and compete to win.",
//     icon: <FiUpload />,
//   },
  {
    id: 6,
    title: "Track Results",
    desc: "Monitor contest results and see winner announcements in real time.",
    icon: <FiTrendingUp />,
  },
];

const EasyStepsSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-950/90 to-slate-900/90 pt-20 py-24">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Easy Steps to Get Your Solution
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Follow a simple and transparent process to participate, submit your
            solution, and track results effortlessly.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all group"
            >
              {/* Step Number */}
              <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
                {step.id}
              </span>

              {/* Icon */}
              <div className="mb-4 text-blue-400 text-3xl group-hover:scale-110 transition-transform">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EasyStepsSection;
