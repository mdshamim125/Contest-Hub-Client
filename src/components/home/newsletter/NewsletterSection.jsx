import { FiMail } from "react-icons/fi";
import Swal from "sweetalert2";

const NewsletterSection = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    // 🔔 SweetAlert Toast
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Subscribed successfully!",
      text: "You’ll now receive the latest contest updates.",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    // Clear input
    e.target.reset();

    // 👉 Later you can send `email` to backend here
    // console.log(email);
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-950/90 to-slate-900/90 pt-20 py-20">
      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 md:p-14 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-blue-600/20 text-blue-400">
              <FiMail size={28} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Stay Updated with Contest Hub
          </h2>

          {/* Description */}
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Subscribe to receive the latest contests, announcements, and winner
            updates directly in your inbox. Never miss an opportunity to
            participate or create a contest.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="w-full px-5 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg"
            >
              Subscribe
            </button>
          </form>

          {/* Trust Text */}
          <p className="mt-4 text-xs text-gray-400">
            We respect your privacy. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
