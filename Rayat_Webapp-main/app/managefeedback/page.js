"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Mail } from "lucide-react"; // Mail icon added
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ManageNews() {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  // Fetch feedback data
  const fetchFeedback = async () => {
    try {
      const response = await fetch("/api/getFeedback");
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Delete feedback
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This feedback will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/deleteFeedback?id=${id}`, { method: "DELETE" });
        if (response.ok) {
          setFeedbackList(feedbackList.filter((feedback) => feedback.id !== id));
          Swal.fire("Deleted!", "The feedback has been deleted.", "success");
        } else {
          Swal.fire("Error", "Failed to delete feedback.", "error");
        }
      } catch (error) {
        console.error("Error deleting feedback:", error);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        setActiveSection={(section) => {
          const routes = {
            addNews: "/addnews",
            manageNews: "/managenews",
            addNotice: "/addnotice",
            manageNotices: "/managenotices",
            addEvent: "/adddocuments",
            manageEvents: "/managedocuments",
            manageSchoolNews: "/adminschoolnews",
            manageSchoolEvents: "/manageadminevents",
            addGallery: "/addimage",
            addRecentActivity: "/addevents",
            manageRecentActivities: "/manageevents",
            addAchievement: "/addachievements",
            manageAchievements: "/manageachievements",
            addAchievementnews: "/addachievementsnews",
            manageAchievementsnews: "/manageachievementsnews",
            addAlumni: "/addalumni",
            manageAlumni: "/managealumni",
            managefeedbackNews: "/managefeedback",
            addrecruitmentNews: "/addrecruitment",
            managerecruitmentNews: "/managerecruitment",
            addScrollingNews: "/addscrollingnews",
            manageScrollingNews: "/managescrollingnews",
          };
          if (routes[section]) router.push(routes[section]);
        }}
      />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback List</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Department</th>
                  <th className="border border-gray-300 px-4 py-2">Message</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.length > 0 ? (
                  feedbackList.map((feedback) => (
                    <tr key={feedback.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{feedback.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{feedback.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{feedback.department}</td>
                      <td className="border border-gray-300 px-4 py-2">{feedback.message}</td>
                      <td className="border border-gray-300 px-4 py-2 flex justify-center gap-4">
                        {/* Mail icon - opens email client */}
                        <a
                          href={`mailto:${feedback.email}?subject=Regarding your feedback&body=Hello ${feedback.name},%0D%0A%0D%0AThank you for your feedback.`}
                          className="text-blue-600 hover:text-blue-800"
                          title="Send Email"
                        >
                          <Mail size={30} />
                        </a>

                        {/* Delete icon */}
                        <button
                          onClick={() => handleDelete(feedback.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Feedback"
                        >
                          <Trash2 size={30} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No feedback available.
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
