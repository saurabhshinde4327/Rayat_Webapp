"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Recruitment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recruitmentData, setRecruitmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchRecruitments() {
      try {
        const res = await fetch("/api/getRecruitment");
        const data = await res.json();
        setRecruitmentData(data);
      } catch (error) {
        console.error("Failed to fetch recruitment data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecruitments();
  }, []);

  // Filtered and paginated data
  const filteredData = searchTerm
    ? recruitmentData.filter((item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : recruitmentData;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white min-h-screen">
      <HeaderSection />
      <Header />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[100px]">
        <Image
          src="/images/academics-banner.jpg"
          alt="Academics"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg uppercase">
            Recruitment Opportunities
          </h3>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-teal-900 text-white py-3">
        <div className="container mx-auto flex justify-center space-x-2 text-sm">
          <Link href="/" className="flex items-center space-x-1 hover:text-yellow-400">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-yellow-400 uppercase">Recruitment Opportunities</span>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto px-4 py-4">
        <input
          type="text"
          placeholder="Search Recruitments..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset page on new search
          }}
        />
      </div>

      {/* Recruitment Cards */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : paginatedData.length === 0 ? (
          <div className="text-center text-gray-500">No recruitment opportunities found.</div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition transform hover:-translate-y-1 duration-300 border-l-4 border-teal-900"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-3">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <Link
                    href={item.file_path}
                    className="mt-3 inline-block px-4 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-400 transition"
                    target="_blank"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md text-teal-800 hover:bg-teal-100 disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === i + 1
                      ? "bg-teal-600 text-white"
                      : "hover:bg-teal-100 text-teal-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md text-teal-800 hover:bg-teal-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
