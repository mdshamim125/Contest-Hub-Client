import React from "react";
import Countdown from "react-countdown";

const SearchResultsModal = ({ results, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-black font-bold">Search Results</h2>
        </div>
        <div className="mt-4 text-black">
          {results.length === 0 ? (
            <p>No contests found with the specified tag.</p>
          ) : (
            <ul>
              {results.map((contest) => (
                <li
                  key={contest._id}
                  className="mb-4 p-4 text-black border rounded-md"
                >
                  <h3 className="text-lg font-semibold">
                    {contest.contestName}
                  </h3>
                  <p>{contest.description}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Category: {contest.category}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Deadline: {new Date(contest.deadline).toLocaleDateString()}
                  </p>
                  <Countdown
                    className="text-2xl font-medium"
                    date={new Date(contest.deadline)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsModal;
