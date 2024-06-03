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
    <section className="contest-section">
      {/* <div className="banner">
        <img
          className="banner-image"
          src={images?.banner}
          alt="Contest Banner"
        />
      </div> */}
      <div className="content">
        <h2 className="title">{text?.title}</h2>
        {/* <p className="description">{text?.description}</p> */}
        <div className="winner-info">
          <div className="winner-image">
            <img
              className="winner-image"
              src={contestWinner?.image}
              alt="Contest Winner"
            />
          </div>
          <div className="winner-details">
            <p className="winner-name">
              <strong>Winner:</strong> {contestWinner?.name}
            </p>
            <p className="winner-prize">
              <strong>Prize:</strong> {contestWinner?.prize}
            </p>
          </div>
        </div>
        <p className="participants">
          <strong>Contest Participants:</strong> {contestParticipants}
        </p>
        <p className="total-winners">
          <strong>Total Contest Winners:</strong> {totalContestWinners}
        </p>
        {/* <p className="how-to-participate">{text?.howToParticipate}</p>
        <p className="terms-and-conditions">{text?.termsAndConditions}</p> */}
      </div>
    </section>
  );
};

export default AdvertiseCard;
