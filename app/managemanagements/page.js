"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ManageManagements() {
  const router = useRouter();
  const [managementList, setManagementList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 15;

  const fetchManagements = async () => {
    try {
      const response = await fetch("/api/getManagements");
      const data = await response.json();
      setManagementList(data);
    } catch (error) {
      console.error("Failed to fetch managements:", error);
    }
  };
  
  useEffect(() => {
    fetchManagements();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This entry will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/deleteManagement?id=${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setManagementList(managementList.filter((item) => item.id !== id));
          Swal.fire("Deleted!", "The entry has been deleted.", "success");
        } else {
          Swal.fire("Error", "Failed to delete the entry.", "error");
        }
      } catch (error) {
        console.error("Error deleting entry:", error);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };
  
  // Pagination calculations
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = managementList.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(managementList.length / entriesPerPage);

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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Management List</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Sub Designation</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.sub_designation}</td>
                      <td className="border border-gray-300 px-4 py-2 flex justify-center gap-4">
                        <a
                          href={item.file_url}
                          target="_blank"
                          title="View File"
                          className="text-green-600 hover:text-green-800"
                        >
                          <Eye size={28} />
                        </a>
                        <button
                          onClick={() => handleDelete(item.id)}
                          title="Delete Entry"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={28} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No management entries available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Buttons */}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-gray-300 rounded px-4 py-2 disabled:opacity-50"
              >
                Prev
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-gray-300 rounded px-4 py-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
