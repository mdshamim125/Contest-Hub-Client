import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AdvertiseCard from "./AdvertiseCard";

const Advertise = () => {
  const axiosPublic = useAxiosPublic();

  const { data: advertise = [], isLoading } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/advertise");
      return data;
    },
  });

  console.log(advertise);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex justify-around gap-6">
      {advertise.map((advertise) => (
        <AdvertiseCard advertise={advertise}></AdvertiseCard>
      ))}
    </div>
  );
};

export default Advertise;
