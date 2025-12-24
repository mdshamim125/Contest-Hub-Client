import React, { useState } from "react";
import { FaUsers, FaTrophy, FaBullhorn, FaChevronDown } from "react-icons/fa";

const faqsData = [
  {
    question: "How can I create a contest?",
    answer:
      "As a contest creator, you can create a contest by filling out the contest details including name, prize money, and submission deadline. Once submitted, an admin will approve it before it goes live.",
  },
  {
    question: "How do I participate in a contest?",
    answer:
      "You need to register/login to Contest Hub, browse available contests, and join. If required, pay the entry fee and submit your work before the deadline.",
  },
  {
    question: "Can I track my contest submissions?",
    answer:
      "Yes, your user dashboard allows you to track all your contest submissions, results, and any prizes won in real-time.",
  },
  {
    question: "How are winners selected?",
    answer:
      "Winners are declared by contest administrators after reviewing submissions. Notifications are sent to participants once winners are declared.",
  },
  {
    question: "Is my data secure on Contest Hub?",
    answer:
      "Absolutely! We use encrypted passwords and secure API calls to protect your information.",
  },
];

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-blue-950/90 to-slate-900/90 text-white">
      {/* Hero Banner */}
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/2qLhF8p/pexels-souvenirpixels-1519088.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About Contest Hub
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            A platform to manage contests, submissions, and judging with
            seamless experience for participants and organizers.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Contest Hub aims to provide a reliable and user-friendly platform
            for managing online contests. We strive to make contest creation,
            participation, and judging easy and transparent for everyone.
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6">
            Our Vision
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Our vision is to become the go-to platform for contest management,
            empowering creators and participants to showcase talent, connect
            with others, and celebrate achievements seamlessly.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl py-16 my-12 mx-6 md:mx-20 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-6">
            <div className="text-blue-400 text-5xl mb-4 flex justify-center">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
            <p className="text-gray-300">
              Intuitive interface for admins, creators, and participants to
              easily manage contests.
            </p>
          </div>

          <div className="p-6">
            <div className="text-blue-400 text-5xl mb-4 flex justify-center">
              <FaTrophy />
            </div>
            <h3 className="text-xl font-semibold mb-2">Contest Management</h3>
            <p className="text-gray-300">
              Create contests, view submissions, and declare winners quickly
              with real-time updates.
            </p>
          </div>

          <div className="p-6">
            <div className="text-blue-400 text-5xl mb-4 flex justify-center">
              <FaBullhorn />
            </div>
            <h3 className="text-xl font-semibold mb-2">Notifications</h3>
            <p className="text-gray-300">
              Stay informed with instant notifications about contest updates,
              winners, and new opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 lg:px-20 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 text-center mb-12">
          Meet The Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Md Shamim"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Md Shamim</h3>
            <p className="text-gray-300">Full Stack Developer</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Teammate 1"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Teammate 1</h3>
            <p className="text-gray-300">Frontend Developer</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Teammate 2"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Teammate 2</h3>
            <p className="text-gray-300">Backend Developer</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 lg:px-20 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <FaChevronDown
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Smooth Expand/Collapse */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-96 mt-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
