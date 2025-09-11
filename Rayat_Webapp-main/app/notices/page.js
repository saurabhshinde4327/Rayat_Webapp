"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

function CircularsContent() {
  const searchParams = useSearchParams();
  const selectedYear = searchParams.get("year") || "";
  const [year, setYear] = useState(selectedYear);
  const [circulars, setCirculars] = useState([]);

  useEffect(() => {
    async function fetchCirculars() {
      try {
        const response = await fetch("/api/notices");
        const data = await response.json();
        setCirculars(data);
      } catch (error) {
        console.error("Failed to fetch circulars", error);
      }
    }
    fetchCirculars();
  }, []);

  const filteredCirculars = year
    ? circulars.filter((circular) => new Date(circular.date).getFullYear().toString() === year)
    : circulars;

  return (
    <div>
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
            Notices
          </h3>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <div className="bg-teal-900 text-white py-3">
        <div className="container mx-auto flex justify-center space-x-2 text-sm">
          <Link href="/" className="flex items-center space-x-1 hover:text-yellow-400">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-yellow-400 uppercase">Notices</span>
        </div>
      </div>

      {/* Year Filter Input */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Enter Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border px-4 py-2 rounded-md shadow-md text-gray-900"
          />
        </div>

        {/* Circulars Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Download</th>
              </tr>
            </thead>
            <tbody>
              {filteredCirculars.length > 0 ? (
                filteredCirculars.map((circular) => (
                  <tr key={circular.id} className="border-b hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{circular.title}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(circular.date).getFullYear()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a
                        href={circular.file_path}
                        download
                        className="text-blue-600 hover:text-blue-800"
                      >
                        📥 Download
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-gray-600 py-4">
                    No circulars found for {year}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading notices...</div>}>
      <CircularsContent />
    </Suspense>
  );
}
