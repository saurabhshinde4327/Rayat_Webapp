
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ManageNews() {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch news with school names
  const fetchNews = async () => {
    try {
      const response = await fetch("/api/getAdminSchoolNews");
      const data = await response.json();
      setNewsList(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handle delete news
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This news will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/deleteSchoolNews?id=${id}`, { method: "DELETE" });
        if (response.ok) {
          setNewsList(newsList.filter((news) => news.id !== id));
          Swal.fire("Deleted!", "The news has been deleted.", "success");
        } else {
          Swal.fire("Error", "Failed to delete news.", "error");
        }
      } catch (error) {
        console.error("Error deleting news:", error);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  // Handle approve news
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`/api/approveSchoolNews?id=${id}`, { method: "PUT" });
      if (response.ok) {
        setNewsList(newsList.map((news) => (news.id === id ? { ...news, verify: 1 } : news)));
        Swal.fire("Approved!", "The news has been approved.", "success");
      } else {
        Swal.fire("Error", "Failed to approve news.", "error");
      }
    } catch (error) {
      console.error("Error approving news:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  // Handle view file
  const handleViewFile = (filePath) => {
    window.open(filePath, "_blank");
  };

  // Filtered news based on dropdown
  const filteredNews = newsList.filter((news) => {
    if (statusFilter === "approved") return news.verify === 1;
    if (statusFilter === "not_approved") return news.verify === 0;
    return true; // for "all"
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
              <h2 className="text-2xl font-semibold text-gray-800">News List</h2>
              <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
>
  <option value="all">All</option>
  <option value="approved">Approved</option>
  <option value="not_approved">Not Approved</option>
</select>

            </div>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">School Name</th>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.length > 0 ? (
                  filteredNews.map((news) => (
                    <tr key={news.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{news.school_name}</td>
                      <td className="border border-gray-300 px-4 py-2">{news.title}</td>
                      <td className="border border-gray-300 px-4 py-2">{news.date}</td>
                      <td className="border border-gray-300 px-4 py-2 flex justify-center gap-4">
                        {news.file_path && (
                          <button
                            onClick={() => handleViewFile(news.file_path)}
                            className="text-green-500 hover:text-green-700"
                          >
                            <Eye size={30} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(news.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={30} />
                        </button>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {news.verify ? (
                          <span className="text-green-600 font-semibold">Approved</span>
                        ) : (
                          <button
                            onClick={() => handleApprove(news.id)}
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
                    <td colSpan="5" className="text-center py-4 text-gray-500">No news available.</td>
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
