import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAuth from "../../../components/hooks/useAuth";

const CheckoutForm = ({ contest, contestPrice }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (contestPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: contestPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, contestPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error(confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Save the payment in the database
        const payment = {
          email: user.email,
          price: contestPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          contestId: contest?._id,
          status: "pending",
        };

        // Save the registration in the contest
        const registration = {
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
        };
        // console.log(registration);
        await axiosSecure.post("/payments", payment);
        const registrationResponse = await axiosSecure.post(
          `/contests/register/${contest?._id}`,
          registration
        );

        if (registrationResponse.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment and registration successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/my-participated-contest");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "You have already registered for this contest",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Card Details
        </label>
        <div className="mt-1">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="border border-gray-300 rounded-md p-3"
          />
        </div>
      </div>
      <button
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {transactionId && (
        <p className="mt-2 text-sm text-green-600">
          Your transaction id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
