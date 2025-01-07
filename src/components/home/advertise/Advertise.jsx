import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AdvertiseCard from "./AdvertiseCard";
import RingLoader from "react-spinners/RingLoader";

const Advertise = () => {
  const axiosPublic = useAxiosPublic();

  const { data: advertise = [], isLoading } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/advertise");
      return data;
    },
  });

  // console.log(advertise);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }
  return (
    <div  data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-easing="ease-in-sine">
      <div className="text-center text-white font-bold text-3xl my-12">
        <h1>Contest Winners</h1>
      </div>
      <div className="container w-full px-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around gap-6 item-center">
        {advertise.map((advertise) => (
          <AdvertiseCard advertise={advertise}></AdvertiseCard>
        ))}
      </div>
    </div>
  );
};

export default Advertise;
