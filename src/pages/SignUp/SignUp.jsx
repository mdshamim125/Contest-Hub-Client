import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../components/hooks/useAuth";

const SignUp = () => {
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, signInWithGoogle, updateUserProfile, setUser } =
    useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (data) => {
    const { email, name, photo, password } = data;
    setRegisterError("");

    // Password validation
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password must include at least one uppercase letter.");
      return;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setRegisterError("Password must include at least one special character.");
      return;
    } else if (!/\d/.test(password)) {
      setRegisterError("Password must include at least one numeric digit.");
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photo);
      setUser({ ...result.user, photoURL: photo, displayName: name });
      toast.success("Sign-up Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Failed to create account");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in successfully");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-800 px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-gray-700 rounded-xl shadow-xl overflow-hidden">
        <div className="px-8 py-4">
          <h1 className="text-3xl font-bold text-white text-center mb-3">
            Create an Account
          </h1>

          {/* Google Sign-up */}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full mb-3 px-4 py-3 bg-white text-gray-700 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 40 40">
              <path
                d="M36.34 16.73H35V16.66H20V23.33H29.42C28.04 27.21 24.35 30 20 30C14.48 30 10 25.52 10 20C10 14.48 14.48 10 20 10C22.55 10 24.87 10.96 26.63 12.53L31.35 7.82C28.37 5.04 24.39 3.33 20 3.33C10.79 3.33 3.33 10.79 3.33 20C3.33 29.20 10.79 36.67 20 36.67C29.20 36.67 36.67 29.20 36.67 20C36.55 18.88 36.55 17.79 36.34 16.73Z"
                fill="#FFC107"
              />
              <path
                d="M5.25 12.24L10.73 16.25C12.21 12.59 15.80 10 20 10C22.55 10 24.87 10.96 26.63 12.53L31.35 7.82C28.37 5.04 24.39 3.33 20 3.33C13.60 3.33 8.04 6.95 5.25 12.24Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.67C24.30 36.67 28.22 35.02 31.17 32.34L26.01 27.97C24.34 29.24 22.26 30 20 30C15.66 30 11.98 27.24 10.60 23.38L5.16 27.57C7.92 32.96 13.52 36.67 20 36.67Z"
                fill="#4CAF50"
              />
              <path
                d="M36.34 16.73H35V16.66H20V23.33H29.42C28.76 25.20 27.56 26.80 26.01 27.97L31.17 32.34C30.81 32.67 36.66 28.33 36.66 20C36.66 18.88 36.55 17.79 36.34 16.73Z"
                fill="#1976D2"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-3">
            <span className="flex-grow border-t border-gray-500"></span>
            <span className="mx-2 text-gray-400 text-xs uppercase">
              or register with email
            </span>
            <span className="flex-grow border-t border-gray-500"></span>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-400 focus:outline-none transition"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                {...register("photo")}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-400 focus:outline-none transition"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-400 focus:outline-none transition"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Strong Password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-400 focus:outline-none transition"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {registerError && (
              <p className="text-red-500 text-sm mb-4">{registerError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center justify-center mt-3 text-gray-400 text-xs">
            Already have an account?
            <Link to="/login" className="ml-1 text-white hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
