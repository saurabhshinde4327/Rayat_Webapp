"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Eye } from "lucide-react"; // Import icons
import Swal from "sweetalert2"; // Import SweetAlert2
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ManageEvents() {
  const router = useRouter();
  const [eventList, setEventList] = useState([]);

  // Fetch events data
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/getAlumni");
      const data = await response.json();
      setEventList(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle delete event
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/deleteAlumni?id=${id}`, { method: "DELETE" });
        if (response.ok) {
          setEventList(eventList.filter(event => event.id !== id));
          Swal.fire("Deleted!", "The event has been deleted.", "success");
        } else {
          Swal.fire("Error", "Failed to delete event.", "error");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  // Handle view file
  const handleViewFile = (filePath) => {
    const fileUrl = `${filePath}`; // Adjust if needed
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="flex h-screen bg-gray-50">
        <Sidebar setActiveSection={(section) => {
                          if (section === "addNews") {
                            router.push("/addnews");
                          } else if (section === "manageNews") {
                            router.push("/managenews");
                          } else if (section === "addNotice") {
                            router.push("/addnotice");
                          } else if (section === "manageNotices") {
                            router.push("/managenotices");
                          } else if (section === "addEvent") {
                            router.push("/adddocuments");
                          } else if (section === "manageEvents") {
                            router.push("/managedocuments");
                          } else if (section === "manageSchoolNews") {
                            router.push("/adminschoolnews");
                          } else if (section === "manageSchoolEvents") {
                            router.push("/manageadminevents");
                          } else if (section === "addGallery") {
                            router.push("/addimage");
                          } else if (section === "addRecentActivity") {
                            router.push("/addevents");
                          } else if (section === "manageRecentActivities") {
                            router.push("/manageevents");
                          } else if (section === "addAchievement") {
                            router.push("/addachievements");
                          } else if (section === "manageAchievements") {
                            router.push("/manageachievements");
                          } else if (section === "addAchievementnews") {
                            router.push("/addachievementsnews");
                          } else if (section === "manageAchievementsnews") {
                            router.push("/manageachievementsnews");
                          } else if (section === "addAlumni") {
                            router.push("/addalumni");
                          } else if (section === "manageAlumni") {
                            router.push("/managealumni");
                          } else if (section === "managefeedbackNews") {
                            router.push("/managefeedback");
                          } else if (section === "addrecruitmentNews") {
                            router.push("/addrecruitment");
                          } else if (section === "managerecruitmentNews") {
                            router.push("/managerecruitment");
                          } else if (section === "addScrollingNews") {
                            router.push("/addscrollingnews");
                          } else if (section === "manageScrollingNews") {
                            router.push("/managescrollingnews");
                          } 
                          
                        }} />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Events List</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">File</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {eventList.length > 0 ? (
                  eventList.map((event) => (
                    <tr key={event.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{event.title}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {event.file_path ? (
                          <button 
                            onClick={() => handleViewFile(event.file_path)} 
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Eye size={30} />
                          </button>
                        ) : (
                          "No File"
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={30} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">No events available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
