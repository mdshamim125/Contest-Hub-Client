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

    <div>
      <div className="text-center font-bold text-3xl my-12">
        <h1>Contest Winners</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around gap-6 item-center">
      {advertise.map((advertise) => (
        <AdvertiseCard advertise={advertise}></AdvertiseCard>
      ))}
    </div>
    </div>
  );
};

export default Advertise;
