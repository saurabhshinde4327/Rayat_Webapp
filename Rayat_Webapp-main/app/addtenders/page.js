"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useRouter } from "next/navigation";

export default function AddNews() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date || !file) {
      setMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("file", file, file.name); // ✅ include the filename

    const response = await fetch("/api/addTenders", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      setTitle("");
      setDate("");
      setFile(null);
      router.push("/managetenders");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar setActiveSection={(section) => {
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
          manageScrollingNews: "/managescrollingnews"
        };
        if (routes[section]) router.push(routes[section]);
      }} />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8">
          <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add Tenders</h2>
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
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
                Upload Tender
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
