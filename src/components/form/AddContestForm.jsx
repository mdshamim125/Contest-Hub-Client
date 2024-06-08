import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Listbox } from "@headlessui/react";
import { FiPlusCircle } from "react-icons/fi";
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
  console.log(loggedInUser);
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="contestName" className="block text-gray-600">
                Contest Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
                name="contestName"
                id="contestName"
                type="text"
                placeholder="Contest Name"
                required
                value={contestName}
                onChange={(e) => setContestName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="image" className="block text-gray-600">
                Image
              </label>
              <div className="p-4 bg-white w-full m-auto rounded-lg flex justify-between items-center">
                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                  <div className="flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        onChange={(e) => handleImage(e.target.files[0])}
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                      <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                        {imageText.length > 20
                          ? imageText.split(".")[0].slice(0, 15) +
                            "...." +
                            imageText.split(".")[1]
                          : imageText}
                      </div>
                    </label>
                  </div>
                </div>
                <div className="h-16 w-16 object-cover overflow-hidden flex items-center">
                  {imagePreview && <img src={imagePreview} alt="Preview" />}
                </div>
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Contest Description
              </label>
              <textarea
                id="description"
                className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500"
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Contest Price
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
                name="price"
                id="price"
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="prizeMoney" className="block text-gray-600">
                Prize Money or Others
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
                name="prizeMoney"
                id="prizeMoney"
                type="text"
                placeholder="Prize Money"
                required
                value={prizeMoney}
                onChange={(e) => setPrizeMoney(e.target.value)}
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="taskSubmission" className="block text-gray-600">
                Task Submission Instructions
              </label>
              <textarea
                id="taskSubmission"
                className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500"
                name="taskSubmission"
                required
                value={taskSubmission}
                onChange={(e) => setTaskSubmission(e.target.value)}
              ></textarea>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="tags" className="block text-gray-600">
                Contest Type/Tags
              </label>
              <Listbox value={selectedTag} onChange={setSelectedTag}>
                <Listbox.Button className="w-full px-4 py-3 border border-rose-300 focus:outline-rose-500 rounded-md">
                  {selectedTag}
                </Listbox.Button>
                <Listbox.Options>
                  {tags.map((tag, index) => (
                    <Listbox.Option
                      key={index}
                      value={tag}
                      className="cursor-pointer select-none relative py-2 pl-10 pr-4"
                    >
                      {tag}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="deadline" className="block text-gray-600">
                Contest Deadline
              </label>
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                className="w-full px-4 py-3 border border-rose-300 focus:outline-rose-500 rounded-md"
              />
            </div>
          </div>
        </div>

        <button
          disabled={loading || loggedInUser?.status==="Blocked"}
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
        >
          {loading ? (
            <FiPlusCircle className="animate-spin m-auto" />
          ) : (
            "Save & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddContestForm;
