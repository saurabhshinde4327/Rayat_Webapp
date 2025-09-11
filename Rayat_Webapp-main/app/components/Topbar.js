"use client";

import { useState, useEffect, useRef } from "react";
import { User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/logout");
      }
    });
  };

  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-between items-center relative text-gray-900">
      <h2 className="text-2xl font-bold ml-4">Dashboard</h2>

      <div className="relative mr-4" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 hover:text-teal-900 transition duration-300 focus:outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <User className="w-7 h-7 text-teal-900" />
          <span className="font-semibold">Profile</span>
          <ChevronDown
            className={`w-4 h-4 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-xl z-50">
            <button
              className="w-full text-left px-5 py-3 hover:bg-gray-100 font-medium text-gray-700"
              onClick={() => router.push("/profile")}
            >
              View Profile
            </button>
            <button
              className="w-full text-left px-5 py-3 hover:bg-gray-100 font-medium text-gray-700"
              onClick={() => router.push("/manage-profile")}
            >
              Manage Profile
            </button>
            <button
              className="w-full text-left px-5 py-3 hover:bg-red-100 text-red-600 font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
