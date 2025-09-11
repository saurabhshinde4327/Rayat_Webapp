"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ManageEvents() {
  const router = useRouter();
  const [eventList, setEventList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/getAdminSchoolActivity");
      const data = await response.json();
      setEventList(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
        const response = await fetch(`/api/deleteAdminSchoolEvent?id=${id}`, { method: "DELETE" });
        if (response.ok) {
          setEventList(eventList.filter((event) => event.id !== id));
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

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`/api/approveSchoolActivity?id=${id}`, { method: "PUT" });
      if (response.ok) {
        setEventList(
          eventList.map((event) =>
            event.id === id ? { ...event, verify: 1 } : event
          )
        );
        Swal.fire("Approved!", "The event has been approved.", "success");
      } else {
        Swal.fire("Error", "Failed to approve event.", "error");
      }
    } catch (error) {
      console.error("Error approving event:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const filteredEvents = eventList.filter((event) => {
    if (statusFilter === "approved") return event.verify === 1;
    if (statusFilter === "not_approved") return event.verify === 0;
    return true;
  });

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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Events List</h2>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700"
              >
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="not_approved">Not Approved</option>
              </select>
            </div>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
  {filteredEvents.length > 0 ? (
    filteredEvents.map((event) => (
      <tr key={event.id} className="text-center">
        <td className="border border-gray-300 px-4 py-2">
          <div className="text-left">
            <div className="font-semibold">{event.title}</div>
            <div className="text-sm text-gray-500">{event.school_name}</div>
          </div>
        </td>
        <td className="border border-gray-300 px-4 py-2">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => console.log("View action clicked")}
              className="text-blue-500 hover:text-blue-700"
              title="View"
            >
              <Eye size={24} />
            </button>
            <button
              onClick={() => handleDelete(event.id)}
              className="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <Trash2 size={24} />
            </button>
          </div>
        </td>
        <td className="border border-gray-300 px-4 py-2">
          {event.verify ? (
            <span className="text-green-600 font-semibold">Approved</span>
          ) : (
            <button
              onClick={() => handleApprove(event.id)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
            >
              Not Approved
            </button>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="text-center py-4 text-gray-500">
        No events available.
      </td>
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
