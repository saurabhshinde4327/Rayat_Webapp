"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
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
      const response = await fetch("/api/addAlumni", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setTitle("");
        setFile(null);
        router.push("/managealumni"); // Redirect to manage news after adding
      }
    } catch (error) {
      setMessage("Error uploading event");
    }
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Add News Form */}
        <main className="flex-1 p-8">
          <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add Alumni</h2>
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
