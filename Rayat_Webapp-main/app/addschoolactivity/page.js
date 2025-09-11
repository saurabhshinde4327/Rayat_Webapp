"use client";

import { useState } from "react";
import SidebarSchool from "../components/SidebarSchool";  // Updated import for SidebarSchool
import SchoolTopbar from "../components/SchoolTopbar";
import { useRouter } from "next/navigation";

export default function AddNews() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      setMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const response = await fetch("/api/addRecentActivity", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setTitle("");
        setFile(null);
        router.push("/manageschoolactivity"); // Redirect to manage news after adding
      }
    } catch (error) {
      setMessage("Error uploading event");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
          {/* SidebarSchool Component */}
          <SidebarSchool setActiveSection={(section) => {
        if  (section === "addEvent") {
          router.push("/adddocuments");
        } else if (section === "manageEvents") {
          router.push("/managedocuments");
        }else if (section === "addSchoolInfo") {
            router.push("/addschoolinfo");
          }else if (section === "manageSchoolInfo") {
            router.push("/manageschoolinfo");
          }else if (section === "addSchoolNew") {
            router.push("/addschoolnews");
          }else if (section === "manageSchoolNew") {
            router.push("/manageschoolnews");
            
          }else if (section === "addRecentsActivity") {
            router.push("/addschoolactivity");
          }else if (section === "manageRecentsActivities") {
            router.push("/manageschoolactivity");
          }else if (section === "addRecentEvents") {
            router.push("/addschoolevents");
          }else if (section === "manageRecentEvents") {
            router.push("/manageschoolevents");
        }
      }} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <SchoolTopbar />

        {/* Add News Form */}
        <main className="flex-1 p-8">
          <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add Recent Activity</h2>
            {message && <p className="text-red-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Upload File</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-teal-900 text-white p-2 rounded w-full"
              >
                Upload Event
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
