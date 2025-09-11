import React from "react";
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import RoomIcon from "@mui/icons-material/Room";
import Image from "next/image";

const regions = [
  {
    name: "Northern Region, Ahmednagar",
    top: "40%",
    left: "30%",
    color: "purple",
    link: "https://maps.app.goo.gl/B949rYC4fj2c9kGBA",
  },
  {
    name: "Western Region, Aundhgaon, Pune",
    top: "48%",
    left: "28%",
    color: "blue",
    link: "https://maps.app.goo.gl/RQWrubx8N37ni6nM6",
  },
  {
    name: "Central Region, Satara",
    top: "60%",
    left: "28%",
    color: "black",
    link: "https://maps.app.goo.gl/eJMa3ZrB7FuJ1ZnH6",
  },
  {
    name: "Southern Region, Sangli",
    top: "63%",
    left: "35%",
    color: "crimson",
    link: "https://maps.app.goo.gl/cPpaP1VQpCHn28UA6",
  },
  {
    name: "Head Office, Satara",
    top: "57%",
    left: "18%",
    color: "green",
    link: "https://maps.app.goo.gl/eJMa3ZrB7FuJ1ZnH6",
  },
];

const MapComponent = () => {
  return (
    <div className="relative w-full max-w-lg sm:max-w-xl mx-auto">
      <h3 className="text-lg font-bold mb-3 text-gray-200 text-center">Find Us</h3>
      <Image src="/images/map3.png" alt="Maharashtra Map" width={600} height={400} className="w-full h-auto" />
      {regions.map((region, index) => (
        <div
          key={index}
          className="absolute flex flex-col items-center group"
          style={{ top: region.top, left: region.left, transform: "translate(-50%, -50%)" }}
        >
          <a href={region.link} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full bg-white shadow-lg hover:scale-110 transition-transform">
            <RoomIcon style={{ fontSize: 20, color: region.color }} />
          </a>
          <span className="hidden group-hover:block absolute left-full ml-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded shadow-md transition-opacity duration-300">
            {region.name}
          </span>
        </div>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm items-start">
        {/* Logo Section */}
        <div className="flex justify-center md:justify-start">
          <Image src="/images/logo1.png" alt="Logo" width={128} height={100} />
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-300 transition-colors">Fee Proposal&apos;s (FRA)</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition-colors">Payment Gateway</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition-colors">Apply for Transcript</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition-colors">Grievance Portal</a></li>
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Important Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://edustaff.maharashtra.gov.in/pavitra/users/login" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                Visit Pavitra Portal
              </a>
            </li>
            <li>
              <a href="https://www.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                MahaGov
              </a>
            </li>
            <li>
              <a href="https://mahadbt.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                MahaDBT
              </a>
            </li>
            <li>
              <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                National Scholarship Portal
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Contact Us</h3>
          <p>📞 02162 233 857</p>
          <p>📍 Karmaveer Samadhi Parisar, Satara, Maharashtra 415001</p>
          <p>✉️ <a href="mailto:secretary@rayatshikshan.edu" className="text-yellow-400 hover:text-yellow-300">secretary@rayatshikshan.edu</a></p>
          <div className="flex space-x-3 mt-4">
            <a href="#" className="p-2 rounded-full bg-blue-700 hover:bg-blue-600 transition-colors"><FaFacebook className="text-white text-xl" /></a>
            <a href="#" className="p-2 rounded-full bg-red-600 hover:bg-red-500 transition-colors"><FaYoutube className="text-white text-xl" /></a>
            <a href="#" className="p-2 rounded-full bg-blue-400 hover:bg-blue-300 transition-colors"><FaTwitter className="text-white text-xl" /></a>
            <a href="#" className="p-2 rounded-full bg-blue-700 hover:bg-blue-600 transition-colors"><FaLinkedin className="text-white text-xl" /></a>
            <a href="#" className="p-2 rounded-full bg-pink-500 hover:bg-pink-400 transition-colors"><FaInstagram className="text-white text-xl" /></a>
          </div>
        </div>

        {/* Google Map */}
        <div>
          <MapComponent />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-white pt-4 text-center text-white text-sm">
        <p>&copy; {new Date().getFullYear()} | Powered by Rayat Shikshan Sanstha, YCIS OIT, Satara</p>
      </div>
    </footer>
  );
};

export default Footer;
