import React from "react";
import {
  FaUser,
  FaTrophy,
  FaGift,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";

const AdvertiseCard = ({ advertise }) => {
  const { contestWinner, contestParticipants, totalContestWinners } = advertise;

  return (
    <div className="bg-gradient-to-br from-blue-900/90 to-slate-800/90 rounded-xl shadow-xl overflow-hidden border border-blue-700/20 hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col pt-8 pb-6 px-6">
      {/* Winner's Image with Glow Effect */}
      <div className="flex justify-center mb-6 relative">
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl transform scale-75 opacity-70"></div>
        <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-lg shadow-blue-500/20 relative z-10">
          <img
            className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
            src={contestWinner?.image || "https://via.placeholder.com/150"}
            alt={contestWinner?.name || "Winner"}
          />
        </div>
      </div>

      {/* Winner's Name with Elegant Typography */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          {contestWinner?.name || "Winner Name"}
        </h2>
        <p className="text-blue-400 text-sm mt-1">Contest Champion</p>
      </div>

      {/* Prize with Emphasized Design */}
      <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-500/30 p-3 rounded-lg text-center mb-6 border border-yellow-500/20">
        <div className="flex items-center justify-center gap-2 font-bold text-yellow-400">
          <FaGift className="text-xl" />
          <span>Prize: {contestWinner?.prize || "$0"}</span>
        </div>
      </div>

      {/* Winner Quote (if available) */}
      {contestWinner?.quote && (
        <div className="bg-blue-950/50 rounded-lg p-4 mb-6 text-gray-300 italic text-sm">
          <div className="flex">
            <FaQuoteLeft className="text-blue-400 opacity-50 mr-2" />
            <p className="flex-1">{contestWinner.quote}</p>
            <FaQuoteRight className="text-blue-400 opacity-50 ml-2 self-end" />
          </div>
        </div>
      )}

      {/* Contest Stats with Modern Design */}
      <div className="mt-auto">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-400 text-sm">
              <FaUser className="text-blue-400" /> Total Participants
            </span>
            <span className="px-3 py-1 bg-blue-900/50 rounded-full text-white font-medium text-sm">
              {contestParticipants || 0}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-400 text-sm">
              <FaTrophy className="text-yellow-500" /> Total Winners
            </span>
            <span className="px-3 py-1 bg-blue-900/50 rounded-full text-white font-medium text-sm">
              {totalContestWinners || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseCard;
