import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import CheckoutForm from "./CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const { data } = await axiosSecure.get(`/contests/${id}`);
        setContest(data);
      } catch (error) {
        // console.error("Failed to fetch contest details", error);
      }
    };

    fetchContest();
  }, [id, axiosSecure]);

  if (!contest) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-center mt-12 mb-6">Pay For {contest.contestName}</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm contestPrice={contest.price} contest={contest} />
      </Elements>
    </div>
  );
};

export default Payment;
