  "use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Eye, Trash } from "lucide-react";

export default function ManageNotices() {
  const router = useRouter();
  const [noticesList, setNoticesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all notices
  const fetchNotices = async () => {
    try {
      const response = await fetch("/api/getNotices");
      const data = await response.json();
      setNoticesList(data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Delete notice
  const deleteNotice = async (id) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      try {
        await fetch(`/api/deleteNotice?id=${id}`, { method: "DELETE" });
        fetchNotices(); // Refresh list
      } catch (error) {
        console.error("Error deleting notice:", error);
      }
    }
  };

  // Sidebar navigation handler
  const handleSectionChange = (section) => {
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
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar setActiveSection={handleSectionChange} />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notices List</h2>

            {loading ? (
              <p className="text-gray-500">Loading notices...</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {noticesList.length > 0 ? (
                    noticesList.map((notice) => (
                      <tr key={notice.id} className="hover:bg-gray-50 transition">
                        <td className="border border-gray-300 px-4 py-2">{notice.title}</td>
                        <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-4">
                          <a
                            href={notice.file_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View Notice"
                          >
                            <Eye className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                          </a>
                          <button onClick={() => deleteNotice(notice.id)} title="Delete Notice">
                            <Trash className="w-5 h-5 text-red-600 hover:text-red-800" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4 text-gray-500">
                        No notices available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

