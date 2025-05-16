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
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchItem.trim()) return;

    try {
      setIsLoading(true);
      const response = await axiosPublic.get(`/api/contests?tag=${searchItem}`);
      setSearchResults(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header
      className="bg-cover bg-center relative flex items-center text-white"
      style={{
        backgroundImage: `url(${banner})`,
        minHeight: "calc(100vh - 0px)",
      }}
    >
      {/* Overlay with improved opacity gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/0"></div>

      <div className="container relative px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="ease-in-sine"
          >
            <div className="lg:max-w-lg">
              <h1 className="text-4xl font-bold lg:text-5xl">
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

              <p className="mt-4 text-xl text-gray-200">
                Be the winner by participating in our{" "}
                <span className="font-medium text-blue-400">amazing</span>{" "}
                contests
              </p>

              <div className="flex flex-col mt-8 space-y-3 md:space-y-0 md:flex-row">
                <div className="relative w-full md:max-w-md">
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 text-gray-700 bg-white border-0 rounded-l-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-40"
                    placeholder="Search by tag name..."
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-r-md md:w-auto hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Searching
                    </span>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-300">
                  Popular tags:
                  <span className="inline-flex ml-2 gap-2 flex-wrap mt-2">
                    {["Art", "Writing", "Gaming", "Business", "Technology"].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSearchItem(tag);
                            handleSearch();
                          }}
                          className="px-3 py-1 text-xs bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </span>
                </p>
              </div>
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
