"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Swal from "sweetalert2";
import { Eye, Trash2 } from "lucide-react";

export default function ManageEbooks() {
  const router = useRouter();
  const [ebookList, setEbookList] = useState([]);

  const fetchEbooks = async () => {
    try {
      const response = await fetch("/api/getEbooks");
      const data = await response.json();
      setEbookList(data.ebooks);
    } catch (error) {
      console.error("Failed to fetch ebooks:", error);
    }
  };

  useEffect(() => {
    fetchEbooks();
  }, []);

  const handleViewFile = (filePath) => {
    window.open(filePath, "_blank");
  };

  const deleteEbook = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This ebook will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await fetch(`/api/deleteEbook?id=${id}`, { method: "DELETE" });
        fetchEbooks();
        Swal.fire("Deleted!", "Ebook has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete ebook:", error);
        Swal.fire("Error", "Something went wrong while deleting.", "error");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar setActiveSection={() => {}} />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ebooks List</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">File</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ebookList && ebookList.length > 0 ? (
                  ebookList.map((ebook) => (
                    <tr key={ebook.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{ebook.title}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {ebook.file_path ? (
                          <a
                            href={ebook.file_path}
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
                        {ebook.file_path && (
                          <button
                            onClick={() => handleViewFile(ebook.file_path)}
                            className="text-green-500 hover:text-green-700"
                            title="View File"
                          >
                            <Eye size={30} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteEbook(ebook.id)}
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
                      No Ebooks available.
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
