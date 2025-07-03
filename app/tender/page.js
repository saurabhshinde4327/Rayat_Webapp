"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";

export default function TendersPage() {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const res = await fetch("/api/getTenders");
        const data = await res.json();
        setTenders(data.tenders);
      } catch (error) {
        console.error("Error fetching tenders:", error);
      }
    };
    fetchTenders();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeaderSection />
      <Header />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[100px]">
        <Image
          src="/images/academics-banner.jpg"
          alt="Academics"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg">
            Tenders
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
          <span className="text-yellow-400">Tenders</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          e-TENDER NOTICE <br /> Rayat Shikshan Sanstha&#39;s
        </h2>

        <p className="text-lg text-gray-700 text-justify mb-8">
          Rayat Shikshan Sanstha has branches spread across 16 districts, 15 in Maharashtra and 1 in Karnataka. The head office of the organization is located in Satara. 05 divisional offices are located in 05 different districts. 1. Central Division, Satara, 2. North Division, Ahilyanagar, 3. South Division, Sangli, 4. West Division, Pune, 5. Raigad Division, Panvel.
        </p>

        {/* ONLINE TENDERS LINK */}
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Online Tenders - Portal -{" "}
          <a
            href="https://edumart.sets.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
           https://edumart.sets.co.in
          </a>
        </h3>

        <p className="text-lg text-gray-700 text-justify">
          The materials required by the organization&#39;s branches are procured through tender method and dealers are selected through Rate Contract. For this, an online e-tender process is implemented. All e-tenders of the organization are published on the portal:&nbsp;
          <a
            href="https://edumart.sets.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
           https://edumart.sets.co.in
          </a>
          <strong>&nbsp; from time to time</strong>.
        </p>
        <br />

        {/* OFFLINE TENDERS TABLE */}
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Offline Tenders</h3>
        <p>
          Tenders whose value is less than 5 lakhs are published offline by giving advertisement in the newspaper. All such tenders documents are placed below for download.
        </p>
        <br />
        <div className="overflow-x-auto shadow border border-gray-300 rounded-lg mb-12">
          <table className="w-full table-auto text-left text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 border">Sr. No</th>
                <th className="px-4 py-3 border">Tender Name</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">View Tender Document</th>
              </tr>
            </thead>
            <tbody>
              {tenders.length > 0 ? (
                tenders.map((tender, index) => (
                  <tr key={tender.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{tender.title}</td>
                    <td className="px-4 py-2 border">
                      {new Date(tender.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex space-x-2">
                        <Link
                          href={`/viewTender/${tender.id}`}
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          View Details
                        </Link>
                        <a
                          href={tender.file_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 underline hover:text-green-800"
                        >
                          Download
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-6">
                    No tenders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
