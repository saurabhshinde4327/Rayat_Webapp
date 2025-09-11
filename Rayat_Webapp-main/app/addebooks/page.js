"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useRouter } from "next/navigation";

export default function AddEbooks() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState(""); // New state for type
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date || !type || !file) {
      setMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("type", type); // Append type
    formData.append("file", file, file.name);

    try {
      const response = await fetch("/api/addEbooks", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setTitle("");
        setDate("");
        setType("");
        setFile(null);
        router.push("/manageebooks");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar setActiveSection={() => {}} />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8">
          <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add Ebooks</h2>
            {message && <p className="text-red-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Date Input */}
              <div>
                <label htmlFor="date" className="block text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Type Input */}
              <div>
                <label htmlFor="type" className="block text-gray-700">
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* File Input */}
              <div>
                <label htmlFor="file" className="block text-gray-700">
                  Upload File
                </label>
                <input
                  type="file"
                  id="file"
                  accept=".pdf,.doc,.docx,.epub"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-teal-900 text-white p-2 rounded w-full"
              >
                Upload Ebook
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
