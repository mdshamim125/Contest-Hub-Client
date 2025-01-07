import React from "react";
import { FaUser, FaTrophy, FaGift } from "react-icons/fa";

const AdvertiseCard = ({ advertise }) => {
  const { contestWinner, contestParticipants, totalContestWinners } = advertise;

  return (
    <div  data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-easing="ease-in-sine" className="container w-full overflow-hidden bg-blue-950 rounded-lg shadow-lg dark:bg-gray-800 flex flex-col items-center p-6">
      {/* Contest Winner's Name */}
      <div className="text-center mb-4">
        <h2 className="text-2xl text-blue-400 font-bold ">
          {contestWinner?.name}
        </h2>
      </div>

      {/* Contest Winner's Image */}
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
        <img
          className="object-cover w-full h-full"
          src={contestWinner?.image}
          alt="Contest Winner"
        />
      </div>

      {/* Contest Prize */}
      <div className="flex items-center justify-center gap-2 font-semibold text-yellow-600 dark:text-yellow-400 mb-4">
        <FaGift className="text-lg" />
        <span>Contest Prize: {contestWinner?.prize}</span>
      </div>

      {/* Additional Contest Details */}
      <div className="w-full px-6">
        <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium">
            <FaUser className="text-blue-500" /> Total Participants
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            {contestParticipants}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium">
            <FaTrophy className="text-green-500" /> Total Winners
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            {totalContestWinners}
          </span>
        </div>
      </div>


    </div>
  );
};

export default AdvertiseCard;
