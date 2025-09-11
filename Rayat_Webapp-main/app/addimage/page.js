"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react"; 
import Swal from "sweetalert2"; // Import SweetAlert2
import Image from "next/image"; // Import Image component

export default function AddImage() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/getSliderImages");
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select an image!",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Uploaded!",
        text: data.message,
      });

      setFile(null);
      router.refresh(); // Refresh the page to show new images
    } else {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: data.message || "Something went wrong!",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    const response = await fetch(`/api/deleteImage?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setImages(images.filter((img) => img.id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The image has been removed.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: "Failed to delete the image.",
      });
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

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-8">
          <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add Image</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button type="submit" className="bg-teal-900 text-white p-2 rounded w-full">
                Upload Image
              </button>
            </form>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Uploaded Images</h2>
            <div className="grid grid-cols-3 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative group">
                  <Image
                    src={img.file_path}
                    alt="Slider"
                    width={300} // Set an appropriate width for the image
                    height={160} // Set an appropriate height for the image
                    className="w-full h-40 object-cover rounded"
                  />
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
