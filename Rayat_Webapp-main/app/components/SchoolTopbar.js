"use client";

import { useState, useEffect } from "react";
import { User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        router.push("/schoollogout"); // Redirect to logout page
      }
    });
  };

  return (
    <header className="w-full bg-white shadow-lg p-4 flex justify-between items-center relative text-gray-900">
      <h2 className="text-2xl font-bold ml-4">Dashboard</h2>
      <div 
        className="relative profile-menu mr-4"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          className="flex items-center space-x-3 hover:text-teal-900 transition duration-300 focus:outline-none"
        >
          <User className="w-8 h-8 text-teal-900" />
          <span className="font-semibold">Profile</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </button>

        {isOpen && (
          <div className="absolute right-1 mt-2 w-52 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50 animate-fadeIn">
            <button className="w-full text-left px-5 py-3 hover:bg-gray-100 font-medium transition text-gray-700" onClick={() => alert("View Profile")}>View Profile</button>
            <button className="w-full text-left px-5 py-3 hover:bg-gray-100 font-medium transition text-gray-700" onClick={() => alert("Manage Profile")}>Manage Profile</button>
            <button className="w-full text-left px-5 py-3 hover:bg-red-100 text-red-600 font-medium transition" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
