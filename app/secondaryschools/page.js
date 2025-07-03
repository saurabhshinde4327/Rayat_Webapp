"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";

export default function SecondarySchoolsPage() {
  const [regions, setRegions] = useState([]);
  const [schoolsByRegion, setSchoolsByRegion] = useState({});
  const [selectedSchools, setSelectedSchools] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({}); // Track which dropdown is open
  const router = useRouter();

  useEffect(() => {
    const fetchRegionsAndSchools = async () => {
      try {
        const res = await fetch("/api/regions");
        const regionsData = await res.json();
        setRegions(regionsData);

        for (const region of regionsData) {
          const res = await fetch(`/api/schools?region_id=${region.id}`);
          const schools = await res.json();
          setSchoolsByRegion((prev) => ({
            ...prev,
            [region.id]: schools,
          }));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchRegionsAndSchools();
  }, []);

  const handleSelection = (regionId, selectedSchool) => {
    setSelectedSchools((prev) => ({
      ...prev,
      [regionId]: selectedSchool,
    }));

    if (selectedSchool?.school_id) {
      router.push(`/school-info/${selectedSchool.school_id}`);
    }
  };

  const toggleDropdown = (regionId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [regionId]: !prev[regionId],
    }));
  };

  const closeDropdown = (regionId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [regionId]: false,
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-visible">
      <HeaderSection />
      <Header />
      <Navbar />

      {/* Banner */}
      <section className="relative w-full h-[100px] overflow-visible z-0">
        <Image
          src="/images/academics-banner.jpg"
          alt="Academics"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg uppercase">
            Secondary Schools
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
          <span className="text-yellow-400 uppercase"> Secondary Schools</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[95%] max-w-6xl bg-[#E0F2F1] flex flex-col items-center mx-auto shadow-lg rounded-tl-[80px] rounded-br-[80px] mt-5 mb-5 border-t-[5px] border-b-[5px] border-[#00A99D] p-6 overflow-visible">
        <h2 className="text-[22px] sm:text-[25px] text-black font-serif text-center">
          Secondary Schools
        </h2>

        <div className="flex items-center justify-center w-full mt-2">
          <hr className="flex-1 border-t-2 border-black sm:w-1/4 w-1/6" />
          <Image
            src="/images/tree.png"
            alt="logo"
            width={64}
            height={64}
            className="h-12 sm:h-16 mx-4"
          />
          <hr className="flex-1 border-t-2 border-black sm:w-1/4 w-1/6" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 w-[80%] max-w-5xl mt-4 relative z-10 overflow-visible">
          {regions.length > 0 ? (
            regions.map((region) => {
              const schools = schoolsByRegion[region.id] || [];
              const selected = selectedSchools[region.id] || "";

              return (
                <div
                  key={region.id}
                  className="mb-6 z-10 transition-all duration-300"
                >
                  <label className="block text-md font-semibold text-gray-800 mb-2">
                    {region.name}
                  </label>

                  <div className="w-full">
                    <select
                      className="w-full p-2 border rounded-lg bg-gray-100 text-left focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={selected?.school_id || ""}
                      onChange={e => {
                        const school = schools.find(s => s.school_id == e.target.value);
                        handleSelection(region.id, school);
                      }}
                      style={{ position: 'relative', zIndex: 1 }}
                    >
                      <option value="">-- Select School --</option>
                      {schools.map((school) => (
                        <option key={school.school_id} value={school.school_id}>
                          {school.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600">Loading regions...</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
