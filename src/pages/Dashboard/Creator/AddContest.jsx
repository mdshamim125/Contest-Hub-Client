import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import useAuth from "../../../components/hooks/useAuth";
import AddContestForm from "../../../components/form/AddContestForm";
import { imageUpload } from "../../../api/utils";

const AddContest = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [contestName, setContestName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [prizeMoney, setPrizeMoney] = useState("");
  const [taskSubmission, setTaskSubmission] = useState("");
  const [selectedTag, setSelectedTag] = useState("Image Design Contests");
  const [deadline, setDeadline] = useState(new Date());

  const handleDates = (item) => {
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (contestData) => {
      const { data } = await axiosPublic.post(`/contests`, contestData);
      return data;
    },
    onSuccess: () => {
      toast.success("Contest Added Successfully!");
      navigate("/dashboard/my-created-contest");
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const image = e.target.image.files[0]; 

      const host = {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      };

      let image_url = "";
      if (image) {
        image_url = await imageUpload(image);
      }

      const contestData = {
        contestName,
        description,
        price,
        prizeMoney,
        taskSubmission,
        category: selectedTag,
        deadline,
        host,
        image: image_url,
      };
      console.log(contestData);
      await mutateAsync(contestData);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <>
      <Helmet>
        <title>Add Contest | Dashboard</title>
      </Helmet>

      <AddContestForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
        contestName={contestName}
        setContestName={setContestName}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        prizeMoney={prizeMoney}
        setPrizeMoney={setPrizeMoney}
        taskSubmission={taskSubmission}
        setTaskSubmission={setTaskSubmission}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        deadline={deadline}
        setDeadline={setDeadline}
      />
    </>
  );
};

export default AddContest;
