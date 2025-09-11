"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";

export default function Ebooks() {
  const [ebooks, setEbooks] = useState([]);
  const [types, setTypes] = useState([]);
  const [activeType, setActiveType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/getEbooks");
      const data = await res.json();

      setEbooks(data.ebooks || []);

      const uniqueTypes = [...new Set(data.ebooks.map((e) => e.type))];
      setTypes(uniqueTypes);

      if (uniqueTypes.length > 0) {
        setActiveType(uniqueTypes[0]);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HeaderSection />
      <Header />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full h-[100px]">
        <Image
          src="/images/academics-banner.jpg"
          alt="Ebooks"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg">
            E-Books
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
          <span className="text-yellow-400">E-Books</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-wrap justify-center gap-3 border-b border-gray-300 pb-3">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-lg font-semibold border-b-4 ${
                activeType === type
                  ? "border-teal-300 text-teal-500"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
  <tr>
    <th className="border border-gray-300 px-4 py-2 text-left text-m font-semibold w-80">
      Title
    </th>
    <th className="border border-gray-300 px-2 py-2 text-left text-m font-semibold w-32">
      Action
    </th>
  </tr>
</thead>

            <tbody>
              {ebooks
                .filter((ebook) => ebook.type === activeType)
                .map((ebook, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-sm">{ebook.title}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a
                        href={ebook.file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-black font-semibold text-sm px-4 py-2 rounded"
                      >
                        View / Download
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}
