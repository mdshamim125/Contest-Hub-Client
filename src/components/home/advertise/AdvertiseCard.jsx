import React from "react";

const AdvertiseCard = ({ advertise }) => {
  const {
    contestWinner,
    contestParticipants,
    totalContestWinners,
    text,
    images,
  } = advertise;
  console.log(advertise);
  console.log(contestParticipants);

  return (
    // <section className="contest-section">
    //   {/* <div className="banner">
    //     <img
    //       className="banner-image"
    //       src={images?.banner}
    //       alt="Contest Banner"
    //     />
    //   </div> */}
    //   <div className="content">
    //     <h2 className="title">{text?.title}</h2>
    //     {/* <p className="description">{text?.description}</p> */}
    //     <div className="winner-info">
    //       <div className="winner-image">
    //         <img
    //           className="w-48 rounded-full h-48"
    //           src={contestWinner?.image}
    //           alt="Contest Winner"
    //         />
    //       </div>
    //       <div className="winner-details">
    //         <p className="winner-name">
    //
    //         </p><strong>Winner:</strong> {contestWinner?.name}
    //         <p className="winner-prize">
    //           <strong>Prize:</strong> {contestWinner?.prize}
    //         </p>
    //       </div>
    //     </div>
    //     <p className="participants">
    //       <strong>Contest Participants:</strong> {contestParticipants}
    //     </p>
    //     <p className="total-winners">
    //       <strong>Total Contest Winners:</strong> {totalContestWinners}
    //     </p>
    //     {/* <p className="how-to-participate">{text?.howToParticipate}</p>
    //     <p className="terms-and-conditions">{text?.termsAndConditions}</p> */}
    //   </div>
    // </section>

    <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 flex flex-col justify-center ">
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
