import React from "react";
import { FaGithub, FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-easing="ease-in-sine"
        className="relative  pb-6 bg-gradient-to-b from-blue-950/90 to-slate-900/90 pt-20"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold text-white">
                Let's keep in touch!
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-white">
                Find us on any of these platforms, we respond in 1-2 business
                days.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6 flex gap-6">
                {/* <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <FaTwitter size={30} className="text-blue-400" />
                </a> */}
                <a
                  href="https://web.facebook.com/md.shamim.421103"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <FaFacebookSquare size={30} className="text-blue-600" />
                </a>
                <a
                  href="https://www.linkedin.com/in/md-shamim125/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <FaLinkedin size={30} className="text-blue-700" />
                </a>
                <a
                  href="https://github.com/mdshamim125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <FaGithub size={30} className="text-white" />
                </a>
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-white text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <NavLink
                        className="text-white font-semibold block pb-2 text-sm"
                        to="/about-us"
                      >
                        About Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-white font-semibold block pb-2 text-sm"
                        to="/contact-us"
                      >
                        Contact Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-white font-semibold block pb-2 text-sm"
                        to="https://github.com/mdshamim125"
                        target="_blank"
                      >
                        Github
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-white font-semibold block pb-2 text-sm"
                        to="https://www.linkedin.com/in/md-shamim125/"
                        target="_blank"
                      >
                        LinkedIn
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-white text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <NavLink
                        className="text-white font-semibold block pb-2 text-sm"
                        to="/about-us"
                      >
                        About Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-white font-semibold block pb-2 text-sm"
                        to="/contact-us"
                      >
                        Contact Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-white font-semibold block pb-2 text-sm"
                        to="https://github.com/mdshamim125"
                        target="_blank"
                      >
                        Github
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-white font-semibold block pb-2 text-sm"
                        to="https://www.linkedin.com/in/md-shamim125/"
                        target="_blank"
                      >
                        LinkedIn
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6 border-blueGray-300" />

          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-white font-semibold py-1">
                Copyright ©{" "}
                <span id="get-current-year">{new Date().getFullYear()}</span>{" "}
                <a
                  href="https://www.linkedin.com/in/md-shamim125/"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Md Shamim
                </a>
                . All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
