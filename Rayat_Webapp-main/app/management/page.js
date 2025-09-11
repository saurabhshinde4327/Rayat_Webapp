"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";

const designationOrder = [
  "President",
  "Vice President ",
  "Representative",
  "Administrator",
  "Managing Council",
  "Invited Members",
  "Regional Officer",
  "Assistant Regional Officer",
  
  // इथे तुमच्या हवे त्या क्रमाने designation लिहा
];

export default function Organization() {
  const [managementData, setManagementData] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/addManagements");
      const data = await res.json();
      setManagementData(data.managements || []);
      // Extract unique designations as tabs
      let designations = [...new Set(data.managements.map(m => m.designation))];
      designations = designations.sort((a, b) => {
        const indexA = designationOrder.findIndex(
          (d) => d.trim().toLowerCase() === a.trim().toLowerCase()
        );
        const indexB = designationOrder.findIndex(
          (d) => d.trim().toLowerCase() === b.trim().toLowerCase()
        );
        if (indexA === -1 && indexB === -1) return 0; // no alpha fallback
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
      setTabs(designations);
      if (designations.length > 0) {
        setActiveTab(designations[0]); // Set first tab active by default
      }
    };
    fetchData();
  }, []);

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
          <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg">
            Managements
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
          <span className="text-yellow-400">Managements</span>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-wrap justify-center gap-3 border-b border-gray-300 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-lg font-semibold border-b-4 ${
                activeTab === tab
                  ? "border-teal-300 text-teal-500"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {managementData
              .filter((member) => member.designation === activeTab)
              .map((member, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-4 text-center"
                >
                  <Image
                    src={member.file_url} // use correct property name
                    alt={member.title}
                    width={120}
                    height={120}
                    className="mx-auto rounded-full border-4 border-blue-100"
                  />
                  <h3 className="mt-4 text-md sm:text-lg font-bold text-teal-900">
                    {member.title}
                  </h3>
                  {member.sub_designation && (
                    <p className="text-gray-600">{member.sub_designation}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
