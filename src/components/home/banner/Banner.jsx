import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SearchResultsModal from "../../../pages/modals/SearchResultsModal";
import banner from "../../../../public/contest-banner.jpg";

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    const response = await axiosPublic.get(`/api/contests?tag=${searchItem}`);
    setSearchResults(response.data);
    setIsModalOpen(true);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500  via-blue-600 to-blue-700 text-white">
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold lg:text-4xl">
                Welcome To The{" "}
                <span className="text-yellow-300">Contest Hub</span>
              </h1>

              <p className="mt-3 text-lg">
                Be the winner by participating in our{" "}
                <span className="font-medium text-yellow-300">amazing</span>{" "}
                contests
              </p>

              <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                <input
                  type="text"
                  className="px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-yellow-300"
                  placeholder="Search By Tag Name"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />

                <button
                  onClick={handleSearch}
                  className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-yellow-500 rounded-lg lg:w-auto lg:mx-4 hover:bg-yellow-400 focus:outline-none focus:bg-yellow-400"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img
              className="w-full md:h-[400px] max-w-md rounded-md"
              src={banner}
              alt="email illustration vector art"
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SearchResultsModal
          results={searchResults}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Banner;
