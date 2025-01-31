import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SearchResultsModal from "../../../pages/modals/SearchResultsModal";
import banner from "../../../../public/Designs_04.jpg";

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleSearch = async () => {
  //   const response = await axiosPublic.get(`/api/contests?tag=${searchItem}`);
  //   setSearchResults(response.data);
  //   setIsModalOpen(true);
  // };

  return (
    <header
      className="bg-cover bg-center relative flex items-center text-white"
      style={{
        backgroundImage: `url(${banner})`,
        minHeight: "calc(100vh - 0px)", // Use inline style for calc()
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container relative px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="ease-in-sine"
          >
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold lg:text-4xl">
                <Typewriter
                  words={["Welcome To The Contest Hub"]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={200}
                  deleteSpeed={30}
                  delaySpeed={2000}
                />
              </h1>

              <p className="mt-3 text-lg">
                Be the winner by participating in our{" "}
                <span className="font-medium text-blue-400">amazing</span>{" "}
                contests
              </p>

              {/* <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                <input
                  type="text"
                  required
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
              </div> */}
            </div>
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
