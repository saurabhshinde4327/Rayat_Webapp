"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Swal from "sweetalert2";
import { Eye, Trash2 } from "lucide-react";

export default function ManageTenders() {
  const router = useRouter();
  const [tenderList, setTenderList] = useState([]);

  const fetchTenders = async () => {
    try {
      const response = await fetch("/api/getTenders");
      const data = await response.json();
      console.log("Fetched tenders on frontend:", data.tenders);
      setTenderList(data.tenders);
    } catch (error) {
      console.error("Failed to fetch tenders:", error);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  const handleViewFile = (filePath) => {
    window.open(filePath, "_blank");
  };

  const deleteTender = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This tender will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`/api/deleteTender?id=${id}`, { method: "DELETE" });
        fetchTenders();

        Swal.fire("Deleted!", "Tender has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete tender:", error);
        Swal.fire("Error", "Something went wrong while deleting.", "error");
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tenders List</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">File</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenderList.length > 0 ? (
                  tenderList.map((tender) => (
                    <tr key={tender.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{tender.title}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {tender.file_path ? (
                          <a
                            href={tender.file_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View File
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 flex justify-center gap-4">
                        {tender.file_path && (
                          <button
                            onClick={() => handleViewFile(tender.file_path)}
                            className="text-green-500 hover:text-green-700"
                            title="View File"
                          >
                            <Eye size={30} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteTender(tender.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={30} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No Tenders available.
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
