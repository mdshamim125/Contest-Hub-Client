import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { imageUpload } from "../../../api/utils";
import EditContestForm from "../../../components/form/EditContestForm";
import useAuth from "../../../components/hooks/useAuth";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import RingLoader from "react-spinners/RingLoader";

const ContestEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

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
  const [imagePreview, setImagePreview] = useState("");
  const [imageText, setImageText] = useState("Upload Image");

  const {
    data: contest,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contest/${id}`);
      return data;
    },
  });

  // Update state when contest data is fetched
  useEffect(() => {
    if (contest) {
      setContestName(contest.contestName || "");
      setDescription(contest.description || "");
      setPrice(contest.price || "");
      setPrizeMoney(contest.prizeMoney || "");
      setTaskSubmission(contest.taskSubmission || "");
      setSelectedTag(contest.category || "Image Design Contests");
      setDeadline(new Date(contest.deadline) || new Date());
      setImagePreview(contest.image || "");
    }
  }, [contest]);

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

    try {
      const image = e.target.image.files[0];

      const creator = {
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
        creator,
        image: image_url || contest.image, // Keep existing image if no new one is uploaded
        status: "pending",
        participants: contest.participants || [],
        participantsCount: contest.participantsCount || 0,
      };

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contest Edit | Dashboard</title>
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
