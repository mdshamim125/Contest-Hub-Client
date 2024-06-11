import React from "react";

const AdvertiseCard = ({ advertise }) => {
  const {
    contestWinner,
    contestParticipants,
    totalContestWinners,
    text,
    images,
  } = advertise;
  // console.log(advertise);
  // console.log(contestParticipants);

  return (
    <div className="container w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 flex flex-col justify-center ">
      <div className="flex justify-center items-center mb-2">
        <a
          href="#"
          className="block text-xl font-bold text-gray-800 dark:text-white"
          tabIndex="0"
          role="link"
        >
          {contestWinner?.name}
        </a>
      </div>
      <div className="flex items-center justify-center">
        <img
          className="object-cover w-64 rounded-full h-64"
          src={contestWinner?.image}
          alt="Contest Winner"
        />
      </div>

      <div className="font-semibold my-2 text-center">
        Contest Prize: {contestWinner?.prize}
      </div>
      <div className="flex items-center justify-between px-6 font-medium mb-2">
        <div className="flex items-center justify-between gap-1 font-medium mb-2">
          <p>Total Participants:</p>
          <span className="text-sm text-gray-700 dark:text-gray-200">
            {contestParticipants}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1 font-medium mb-2">
          <p>Total Winners:</p>
          <p>{totalContestWinners}</p>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseCard;
