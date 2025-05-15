import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Listbox } from "@headlessui/react";
import {
  FiPlusCircle,
  FiUpload,
  FiDollarSign,
  FiAward,
  FiCalendar,
  FiTag,
  FiFileText,
} from "react-icons/fi";
import useRole from "../hooks/useRole";

const tags = [
  "Image Design Contests",
  "Article Writing",
  "Marketing Strategy",
  "Digital Advertisement Contests",
  "Gaming Review",
  "Book Review",
  "Business Idea Contests",
  "Movie Review",
];

const AddContestForm = ({
  handleSubmit,
  loading,
  imageText,
  handleImage,
  imagePreview,
  handleDates,
  dates,
  contestName,
  setContestName,
  description,
  setDescription,
  price,
  setPrice,
  prizeMoney,
  setPrizeMoney,
  taskSubmission,
  setTaskSubmission,
  selectedTag,
  setSelectedTag,
  deadline,
  setDeadline,
}) => {
  const { loggedInUser } = useRole();

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 dark:text-white rounded-xl bg-gradient-to-br from-blue-950 to-slate-900 p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Create New Contest
          </h1>
          <p className="text-gray-400 mt-2">
            Fill in the details to create an exciting contest
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Contest Name */}
              <div className="space-y-2">
                <label
                  htmlFor="contestName"
                  className="block text-sm font-medium text-gray-300"
                >
                  Contest Name
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    name="contestName"
                    id="contestName"
                    type="text"
                    placeholder="Enter contest name"
                    required
                    value={contestName}
                    onChange={(e) => setContestName(e.target.value)}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-300"
                >
                  Contest Image
                </label>
                <div className="p-4 bg-white/5 border border-gray-700 rounded-lg">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-full">
                      <input
                        className="hidden"
                        type="file"
                        onChange={(e) => handleImage(e.target.files[0])}
                        name="image"
                        id="image"
                        accept="image/*"
                      />
                      <label
                        htmlFor="image"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        <div className="text-center">
                          <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-400">
                            {imageText.length > 20
                              ? imageText.split(".")[0].slice(0, 15) +
                                "...." +
                                imageText.split(".")[1]
                              : imageText}
                          </p>
                        </div>
                      </label>
                    </div>
                    {imagePreview && (
                      <div className="w-full h-48 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300"
                >
                  Contest Description
                </label>
                <textarea
                  id="description"
                  className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 h-32 resize-none"
                  name="description"
                  required
                  placeholder="Describe your contest..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-300"
                >
                  Contest Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Enter contest price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Prize Money */}
              <div className="space-y-2">
                <label
                  htmlFor="prizeMoney"
                  className="block text-sm font-medium text-gray-300"
                >
                  Prize Money
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiAward className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    name="prizeMoney"
                    id="prizeMoney"
                    type="text"
                    placeholder="Enter prize money"
                    required
                    value={prizeMoney}
                    onChange={(e) => setPrizeMoney(e.target.value)}
                  />
                </div>
              </div>

              {/* Task Submission */}
              <div className="space-y-2">
                <label
                  htmlFor="taskSubmission"
                  className="block text-sm font-medium text-gray-300"
                >
                  Task Submission Instructions
                </label>
                <textarea
                  id="taskSubmission"
                  className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 h-32 resize-none"
                  name="taskSubmission"
                  required
                  placeholder="Provide submission instructions..."
                  value={taskSubmission}
                  onChange={(e) => setTaskSubmission(e.target.value)}
                ></textarea>
              </div>

              {/* Contest Type/Tags */}
              <div className="space-y-2">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-300"
                >
                  Contest Type/Tags
                </label>
                <Listbox value={selectedTag} onChange={setSelectedTag}>
                  <div className="relative">
                    <Listbox.Button className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-left">
                      <span className="flex items-center">
                        <FiTag className="absolute left-3 h-5 w-5 text-gray-400" />
                        {selectedTag}
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {tags.map((tag, index) => (
                        <Listbox.Option
                          key={index}
                          value={tag}
                          className={({ active }) =>
                            `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "bg-blue-600 text-white"
                                : "text-gray-300"
                            }`
                          }
                        >
                          {tag}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-300"
                >
                  Contest Deadline
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <DatePicker
                    selected={deadline}
                    onChange={(date) => setDeadline(date)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholderText="Select deadline"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              disabled={loading || loggedInUser?.status === "Blocked"}
              type="submit"
              className="w-full max-w-md px-6 py-3 text-center font-medium text-white transition duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FiPlusCircle className="animate-spin mr-2" />
                  Creating Contest...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FiFileText className="mr-2" />
                  Create Contest
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContestForm;
