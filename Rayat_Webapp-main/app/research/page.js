"use client"
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

export default function Research() {
  const [searchQuery, setSearchQuery] = useState("");

  const colleges = [
    ["Chh. Shivaji College, Satara", 6, 7, "-", "-", 2],
    ["Sadguru Gadage Maharaj College, Karad", 11, 42, 12, 17, 5],
    ["Azad College of Education, Satara", 3, 25, "-", 26, 1],
    ["Yashwantrao Chavan Institute of Science, Satara", 15, 38, 8, 15, 4],
    ["Dahiwadi College, Dahiwadi", 4, 7, 14, 3, 1],
    ["Ismailsaheb Mulla Law College, Satara", 1, 11, 2, 2, 0],
    ["Dhananjayrao Gadgil College of Commerce, Satara", 1, 4, 4, 1, 0],
    ["D.P.Bhosale College, Koregaon", 2, 2, 1, "-", 1],
    ["Sharadchandra Pawar Mahavidyalaya, Lonand", 2, 7, 1, 0, 0],
    ["Savitribai Phule Mahila Mahavidyalaya, Satara", 7, 17, 2, 6, 3],
  ];

  const filteredColleges = colleges.filter(college =>
    college[0].toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Research
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
          <span className="text-yellow-400 uppercase">Research</span>
        </div>
      </div>

      {/* Research Overview */}
      <section className="container mx-auto py-12 px-4 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Research at Our Institution
        </h2>
        <p className="mt-4 text-lg text-justify">
          The administration of the Sanstha and the teachers are always alert to promote qualitative as well as quantitative change.
          To improve student quality, teacher status, and merit, the Sanstha publishes a research journal called <span className="font-semibold">‘Trajectory’</span> twice a year.
          Faculty members actively contribute research articles to this journal and other national and international publications.
          Additionally, many teachers have made significant contributions to textbooks and reference materials.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900">Research Achievements</h3>
            <ul className="mt-2 list-disc list-inside">
              <li><strong>204</strong> Research Teachers designated by major universities</li>
              <li><strong>311</strong> Ph.D. holders</li>
              <li><strong>82</strong> Research guides</li>
              <li><strong>261</strong> M.Phil degree holders</li>
            </ul>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900">Conference & Journal Publications</h3>
            <ul className="mt-2 list-disc list-inside">
              <li><strong>217</strong> International conference papers presented</li>
              <li><strong>461</strong> National conference papers presented</li>
              <li><strong>189</strong> International journal publications</li>
              <li><strong>192</strong> National journal publications</li>
            </ul>
          </div>
        </div>
      </section>

      {/* College-wise Research Contributions */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          College-wise Research Contributions
        </h2>

        {/* Search Input */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 w-1/3 border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse text-sm bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border px-4 py-3">Sr. No.</th>
                <th className="border px-4 py-3">College Name</th>
                <th className="border px-4 py-3">International Conference</th>
                <th className="border px-4 py-3">National Conference</th>
                <th className="border px-4 py-3">International Journal</th>
                <th className="border px-4 py-3">National Journal</th>
                <th className="border px-4 py-3">Patent</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-3 text-center font-semibold">{index + 1}</td>
                    <td className="border px-4 py-3 font-semibold">{row[0]}</td>
                    <td className="border px-4 py-3 text-center">{row[1]}</td>
                    <td className="border px-4 py-3 text-center">{row[2]}</td>
                    <td className="border px-4 py-3 text-center">{row[3]}</td>
                    <td className="border px-4 py-3 text-center">{row[4]}</td>
                    <td className="border px-4 py-3 text-center">{row[5]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No matching colleges found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  );
}
