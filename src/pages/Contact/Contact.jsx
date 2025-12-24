import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // You can later integrate API call here for email submission

    // SweetAlert2 toast
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Message sent successfully!",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    e.target.reset(); // Clear the form
  };

  return (
    <section className="bg-gradient-to-b from-blue-950/90 to-slate-900/90 text-white">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/2qLhF8p/pexels-souvenirpixels-1519088.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
          <h4 className="text-lg md:text-xl font-semibold text-blue-400">
            Get in Touch
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Contact Contest Hub
          </h2>
          <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
            Reach out to us for contest inquiries, support, or feedback.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-6">
            Send Us a Message
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="text-gray-300 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Full Name"
                  className="mt-2 w-full px-4 py-2 rounded-lg bg-slate-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-gray-300 text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email Address"
                  className="mt-2 w-full px-4 py-2 rounded-lg bg-slate-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="message" className="text-gray-300 text-sm">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Your Message"
                className="mt-2 w-full px-4 py-2 rounded-lg bg-slate-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition font-semibold py-3 rounded-lg shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Contact Info</h3>
            <p className="text-gray-300 mb-6">
              Contest Hub is a platform to manage contests, submissions, and
              judging. Reach out to us for support or inquiries.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <span className="p-3 bg-blue-600 rounded-full text-white">
                  <FaPhone />
                </span>
                <span>+8801710534833</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="p-3 bg-blue-600 rounded-full text-white">
                  <FaEnvelope />
                </span>
                <span>cse12005038brur@gmail.com</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="p-3 bg-blue-600 rounded-full text-white">
                  <FaMapMarkerAlt />
                </span>
                <span>Rangpur, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700"
                  >
                    <Icon className="text-white" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="container mx-auto px-6 lg:px-20 mb-16">
        <h3 className="text-2xl font-bold text-white mb-4">Find Us on Map</h3>
        <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Rangpur Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.987896171227!2d88.63722177500022!3d25.748151183651933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed876e1b6b3f21%3A0x95e3f1bbcb38b3ff!2sRangpur%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1698489000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
