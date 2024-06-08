import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { imageUpload } from "../../../api/utils";
import EditContestForm from "../../../components/form/EditContestForm";
import useAuth from "../../../components/hooks/useAuth";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";

const ContestEdit = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const axiosSecure=useAxiosSecure()
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const {
    data: contest = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contest/${id}`);

      return data;
    },
  });

  console.log(contest);

  const [contestName, setContestName] = useState(`${contest?.contestName}`);
  const [description, setDescription] = useState(`${contest?.description}`);
  const [price, setPrice] = useState(`${contest?.price}`);
  const [prizeMoney, setPrizeMoney] = useState(`${contest?.prizeMoney}`);
  const [taskSubmission, setTaskSubmission] = useState(
    `${contest?.taskSubmission}`
  );
  const [selectedTag, setSelectedTag] = useState(`${contest?.category}`);
  const [deadline, setDeadline] = useState(contest?.deadline);

  const [imagePreview, setImagePreview] = useState(`${contest?.image}`);
  const [imageText, setImageText] = useState("Upload Image");

  const handleDates = (item) => {
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (contestData) => {
      const { data } = await axiosSecure.put(
        `/contest/update/${id}`,
        contestData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Contest updated Successfully!");
      navigate("/dashboard/my-created-contest");
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("hi");

    try {
      const image = e.target.image.files[0];

      const creator = {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      };

      console.log(image, creator);

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
        creator,
        image: image_url,
        status: "pending",
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

      <EditContestForm
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

export default ContestEdit;
