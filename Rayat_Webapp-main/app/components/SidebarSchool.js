"use client";

import {
  LogOut,
  Home,
  Settings,
  Users,
  ChevronDown,
  PlusCircle,
  ClipboardList,
  Calendar,
  Image,
  Trophy,
  Newspaper,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Sidebar({ setActiveSection }) {
  const [menuState, setMenuState] = useState({
    newsOpen: false,
    noticesOpen: false,
    eventsOpen: false,
    galleryOpen: false,
    recentActivitiesOpen: false,
    schoolInfoOpen: false, // Changed from achievementsOpen to schoolInfoOpen
  });

  const router = useRouter(); // Initialize the router

  const toggleMenu = (menu) => {
    setMenuState((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside className="w-64 bg-teal-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <nav className="flex-1">
        <ul>
          {/* Home (Dashboard Link) */}
          <li className="mb-3">
            <button
              onClick={() => router.push("/dashboardschool")} // Navigate to Dashboard
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Home className="w-5 h-5 mr-2" /> Home
            </button>
          </li>

          
          {/* School Information Section */}
          <li className="mb-3">
            <button
              onClick={() => toggleMenu("schoolInfoOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Trophy className="w-5 h-5 mr-2" /> School Information
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.schoolInfoOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuState.schoolInfoOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                    onClick={() => setActiveSection("addSchoolInfo")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add School Info
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    onClick={() => setActiveSection("manageSchoolInfo")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" /> Manage School Info
                  </button>
                </li>
              </ul>
            )}
          </li>

{/* School News  */}
<li className="mb-3">
            <button
              onClick={() => toggleMenu("eventsOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Calendar className="w-5 h-5 mr-2" /> School News 
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.eventsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuState.eventsOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                    onClick={() => setActiveSection("addSchoolNew")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add School News 
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    onClick={() => setActiveSection("manageSchoolNew")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" /> Manage School News 
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Recent Activities */}
          {/* <li className="mb-3">
            <button
              onClick={() => toggleMenu("recentActivitiesOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Calendar className="w-5 h-5 mr-2" /> Recent Activities
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.recentActivitiesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuState.recentActivitiesOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                    onClick={() => setActiveSection("addRecentsActivity")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Recent Activity
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    onClick={() => setActiveSection("manageRecentsActivities")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" /> Manage Recent Activities
                  </button>
                </li>
              </ul>
            )}
          </li> */}

{/* Slider */}
{/* <li className="mb-3">
            <button
              onClick={() => toggleMenu("galleryOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Image className="w-5 h-5 mr-2" /> Slider
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.galleryOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuState.galleryOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                    onClick={() => setActiveSection("addGallery")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Image
                  </button>
                </li>
              </ul>
            )}
          </li> */}

          {/* Our Alumni */}
          {/* <li className="mb-3">
            <button
              onClick={() => toggleMenu("alumniOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <GraduationCap className="w-5 h-5 mr-2" /> Recent Events
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.alumniOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuState.alumniOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                    onClick={() => setActiveSection("addRecentEvents")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Recent Events
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    onClick={() => setActiveSection("manageRecentEvents")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" /> Manage Recent Events
                  </button>
                </li>
              </ul>
            )}
          </li> */}
        </ul>
      </nav>
    </aside>
  );
}
