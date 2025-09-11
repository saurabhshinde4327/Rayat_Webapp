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
    achievementsOpen: false,
    eventOpen: false,
    seventOpen: false,
    achievementsnewsOpen: false,
    scrollingNewsOpen: false,
    recruitmentNewsOpen: false,
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
              onClick={() => router.push("/dashboard")} // Navigate to Dashboard
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Home className="w-5 h-5 mr-2" alt="Home Icon" /> Home
            </button>
          </li>

          {/* Circular (News) */}
          <li className="mb-3">
            <button
              onClick={() => toggleMenu("newsOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Users className="w-5 h-5 mr-2" alt="Circular Icon" /> Circular
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.newsOpen ? "rotate-180" : ""
                }`}
                alt="Chevron Icon"
              />
            </button>
            {menuState.newsOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                   onClick={() => router.push("/addnews")}

                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" alt="Add News Icon" /> Add News
                  </button>
                </li>
                <li className="mt-2">
                  <button
                 onClick={() => router.push("/managenews")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" alt="Manage News Icon" /> Manage News
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Notices */}
          <li className="mb-3">
            <button
              onClick={() => toggleMenu("noticesOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Settings className="w-5 h-5 mr-2" alt="Notices Icon" /> Notices
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.noticesOpen ? "rotate-180" : ""
                }`}
                alt="Chevron Icon"
              />
            </button>
            {menuState.noticesOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                     onClick={() => router.push("/addnotice")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" alt="Add Notice Icon" /> Add Notice
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    onClick={() => router.push("/managenotices")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" alt="Manage Notices Icon" /> Manage Notices
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Documents (School News) */}
          <li className="mb-3">
            <button
              onClick={() => toggleMenu("eventOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Calendar className="w-5 h-5 mr-2" alt="School News Icon" /> School News
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.eventOpen ? "rotate-180" : ""
                }`}
                alt="Chevron Icon"
              />
            </button>
            {menuState.eventOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                   onClick={() => router.push("/adminschoolnews")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" alt="Manage School News Icon" /> Manage School News
                  </button>
                </li>
              </ul>
            )}
          </li>

{/* recruitment*/}
          <li className="mb-3">
            <button
              onClick={() => toggleMenu("recruitmentOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Settings className="w-5 h-5 mr-2" alt="Notices Icon" /> Recruitment
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.recruitmentOpen ? "rotate-180" : ""
                }`}
                alt="Chevron Icon"
              />
            </button>
            {menuState.recruitmentOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                     onClick={() => router.push("/addrecruitment")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" alt="Add Notice Icon" /> Add Recruitment
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    onClick={() => router.push("/managerecruitment")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" alt="Manage Notices Icon" /> Manage Recruitment
                  </button>
                </li>
              </ul>
            )}
          </li>
          

          {/* Slider */}
          <li className="mb-3">
            <button
              onClick={() => toggleMenu("galleryOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Image className="w-5 h-5 mr-2" alt="Slider Icon" /> Slider
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.galleryOpen ? "rotate-180" : ""
                }`}
                alt="Chevron Icon"
              />
            </button>
            {menuState.galleryOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                    onClick={() => router.push("/addimage")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" alt="Add Image Icon" /> Add Image
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Recent Activities */}
          <li className="mb-3">
            <button
              onClick={() => toggleMenu("recentActivitiesOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Calendar className="w-5 h-5 mr-2" alt="Recent Activities Icon" /> Recent Activities
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.recentActivitiesOpen ? "rotate-180" : ""
                }`}
                alt="Chevron Icon"
              />
            </button>
            {menuState.recentActivitiesOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                    onClick={() => router.push("/addevents")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" alt="Add Recent Activity Icon" /> Add Recent Activity
                  </button>
                </li>
                <li className="mt-2">
                  <button
                   onClick={() => router.push("/manageevents")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" alt="Manage Recent Activities Icon" /> Manage Recent Activities
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Achievements Section */}
          <li className="mb-3">
            <button
              onClick={() => toggleMenu("achievementsOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Trophy className="w-5 h-5 mr-2" alt="Achievements Icon" /> Achievements
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.achievementsOpen ? "rotate-180" : ""
                }`}
                alt="Chevron Icon"
              />
            </button>
            {menuState.achievementsOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                    onClick={() => router.push("/addachievements")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" alt="Add Achievement Icon" /> Add Achievement
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    onClick={() => router.push("/manageachievements")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" alt="Manage Achievements Icon" /> Manage Achievements
                  </button>
                </li>
              </ul>
            )}
          </li>


          <li className="mb-3">
            <button
              onClick={() => toggleMenu("achievementsnewsOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Trophy className="w-5 h-5 mr-2" /> Achievements News
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.achievementsnewsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuState.achievementsnewsOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                 onClick={() => router.push("/addachievementsnews")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Achievement News
                  </button>
                </li>
                <li className="mt-2">
                  <button
                 onClick={() => router.push("/manageachievementsnews")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" /> Manage Achievements News
                  </button>
                </li>
              </ul>
            )}
          </li>

{/* Add Managements Section */}
          <li className="mb-3">
            <button
              onClick={() => toggleMenu("managementsnewsOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Trophy className="w-5 h-5 mr-2" /> Managements
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.managementsnewsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuState.managementsnewsOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                    onClick={() => router.push("/addmanagements")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Managements
                  </button>
                </li>
                <li className="mt-2">
                  <button
                      onClick={() => router.push("/managemanagements")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" /> Manage Managements
                  </button>
                </li>
              </ul>
            )}
          </li>

{/* Scrolling News Section */}
<li className="mb-3">
            <button
              onClick={() => toggleMenu("scrollingNewsOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Newspaper className="w-5 h-5 mr-2" /> Tenders
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.scrollingNewsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuState.scrollingNewsOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                      onClick={() => router.push("/addtenders")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Tenders
                  </button>
                </li>
                <li className="mt-2">
                  <button
                      onClick={() => router.push("/managescrollingnews")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" /> Manage Tenders
                  </button>
                </li>
              </ul>
            )}
          
<li className="mb-3">
            <button
              onClick={() => toggleMenu("ebooksOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <Newspaper className="w-5 h-5 mr-2" /> Ebooks
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.ebooksOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuState.ebooksOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                    onClick={() => router.push("/addebooks")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Ebooks
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    onClick={() => router.push("/manageebooks")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" /> Manage Ebooks
                  </button>
                </li>
              </ul>
            )}
          </li>

            {/* Our Alumni */}
            <li className="mb-3">
            <button
              onClick={() => toggleMenu("alumniOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <GraduationCap className="w-5 h-5 mr-2" /> Our Alumni
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
                     onClick={() => router.push("/addalumni")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Alumni
                  </button>
                </li>
                <li className="mt-2">
                  <button
                     onClick={() => router.push("/managealumni")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <ClipboardList className="w-4 h-4 mr-2" /> Manage Alumni
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li className="mb-3">
            <button
              onClick={() => toggleMenu("feedbackOpen")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <GraduationCap className="w-5 h-5 mr-2" /> Feedback
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  menuState.feedbackOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuState.feedbackOpen && (
              <ul className="ml-6 mt-2">
                <li>
                  <button
                     onClick={() => router.push("/managefeedback")}
                    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />Manage Feedback
                  </button>
                </li>

              </ul>
            )}
          </li>

          </li>


<li className="mb-3">
  <button
    onClick={() => toggleMenu("aiPortalOpen")}
    className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
  >
    <Newspaper className="w-5 h-5 mr-2" /> AI Portal
    <ChevronDown
      className={`w-4 h-4 ml-auto transition-transform ${
        menuState.aiPortalOpen ? "rotate-180" : ""
      }`}
    />
  </button>
  {menuState.aiPortalOpen && (
    <ul className="ml-6 mt-2">
      <li>
        <button
          onClick={() => router.push("/manageaiportal")}
          className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Manage AI Report
        </button>
      </li>
      
    </ul>
  )}
</li>

          {/* Logout */}
          <li className="mt-auto">
            <button
              onClick={() => router.push("/logout")}
              className="flex items-center p-2 hover:bg-teal-700 rounded w-full text-left"
            >
              <LogOut className="w-5 h-5 mr-2" alt="Logout Icon" /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
