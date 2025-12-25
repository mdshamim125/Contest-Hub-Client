import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, accent }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg"
    >
      {/* Accent Bar */}
      <div
        className={`absolute top-0 left-0 h-1 w-full rounded-t-2xl ${accent}`}
      />

      <div className="flex items-center justify-between">
        {/* Text */}
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>

        {/* Icon */}
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl ${accent} bg-opacity-20`}
        >
          <Icon className="text-xl text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
