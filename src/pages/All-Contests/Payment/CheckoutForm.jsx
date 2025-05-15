import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAuth from "../../../components/hooks/useAuth";
import { Helmet } from "react-helmet";
import { FiCreditCard, FiLock, FiCheck, FiAlertCircle } from "react-icons/fi";
import RingLoader from "react-spinners/RingLoader";

const CheckoutForm = ({ contest, contestPrice }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
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
    setIsProcessing(true);

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
      setIsProcessing(false);
    } else {
      setError("");

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
        setError(confirmError.message);
        setIsProcessing(false);
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

          try {
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
                text: "You have been successfully registered for the contest",
                showConfirmButton: false,
                timer: 2000,
              });
              navigate("/dashboard/my-participated-contest");
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Registration failed",
                text: "You have already registered for this contest",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          } catch (error) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error",
              text: "Something went wrong. Please try again.",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Payment | Contest Hub</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        {/* Contest Summary */}
        <div className="bg-white/5 rounded-lg p-6 mb-8 backdrop-blur-sm border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">
            Contest Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Contest Name</span>
              <span className="text-white font-medium">
                {contest?.contestName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Entry Fee</span>
              <span className="text-white font-medium">${contestPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Prize Money</span>
              <span className="text-white font-medium">
                {contest?.prizeMoney}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Payment Details</h2>
            <div className="flex items-center text-green-400">
              <FiLock className="mr-2" />
              <span className="text-sm">Secure Payment</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Card Details
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#ffffff",
                        "::placeholder": {
                          color: "#9ca3af",
                        },
                        backgroundColor: "transparent",
                      },
                      invalid: {
                        color: "#ef4444",
                      },
                    },
                  }}
                  className="pl-10 pr-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center text-red-400 bg-red-900/20 p-3 rounded-lg">
                <FiAlertCircle className="mr-2" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {transactionId && (
              <div className="flex items-center text-green-400 bg-green-900/20 p-3 rounded-lg">
                <FiCheck className="mr-2" />
                <span className="text-sm">Transaction ID: {transactionId}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || !clientSecret || isProcessing}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <RingLoader color="#ffffff" size={20} className="mr-2" />
                  Processing...
                </span>
              ) : (
                "Pay Now"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
