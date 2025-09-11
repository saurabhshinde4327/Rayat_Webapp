"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import Link from "next/link";
import Image from "next/image";

const Courses = () => {
  return (
    <>
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
          courses
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
          <span className="text-yellow-400 uppercase">courses</span>
        </div>
      </div>
      <div className="w-[95%] max-w-6xl bg-[#E0F2F1] flex flex-col items-center mx-auto shadow-[0_5px_10px_rgba(0,0,0,0.25)] rounded-tl-[80px] rounded-br-[80px] mt-5 mb-5 border-t-[5px] border-b-[5px] border-[#00A99D] p-6">
        {/* Title */}
        {/* <h2 className="text-[22px] sm:text-[25px] text-black font-serif text-center">
          Courses
        </h2> */}

        {/* Divider with Logo */}
        <div className="flex items-center justify-center w-full mt-2">
          <hr className="flex-1 border-t-2 border-black sm:w-1/4 w-1/6" />
          <Image
  src="/images/tree.png"
  alt="logo"
  width={48} // Set a width that suits your design
  height={48} // Set a height that suits your design
  className="mx-4"
/>

          <hr className="flex-1 border-t-2 border-black sm:w-1/4 w-1/6" />
        </div>

        <p className="text-black text-justify p-5 ">
          11 Courses of different kinds are conducted in the 42 Colleges of the Sanstha.
          These include B.A. Course at 27 Colleges, M.A. at 14, B.Com. at 25, M.Com. at 9,
          B.Sc. at 18, M.Sc. at 8, Management 1 B.Ed. 2, Professional Courses at 27,
          Career Oriented Courses at 19, Autonomous Courses at 16 in Sanstha’s
          different Colleges and various short-term courses are run so that students
          of the degree courses like B.A., B.Com., B.Sc. should get vocational training.
        </p>

        <Tabs />
      </div>
      <Footer />
    </>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const coursesData = [
    {
      id: 1,
      name: "Professional Courses",
      courses: [
        "BCA", "BCS", "Bio-Technology", "ECS", "BBA", "MBA", "DTL",
        "DBM", "IT", "B.Sc-IT", "BMS",
      ],
    },
    {
      id: 2,
      name: "Career Oriented Courses (by U.G.C.)",
      courses: [
        "Information Technology", "Certificate Course in Marketing",
        "Retail Marketing", "Diploma Course in Marketing",
        "Advanced Diploma in Marketing", "Certificate Course in Banking",
        "Diploma Course in Banking",
      ],
    },
    {
      id: 3,
      name: "Autonomous Courses (Self Financing)",
      courses: ["Diploma in Export Import Management"],
    },
    {
      id: 4,
      name: "Short Term Courses",
      courses: [
        "English Speaking Course", "BPO Training", "Mehandi", "Rangoli",
        "Tally", "Visual Basic", "Tailoring and Fashion Designing",
        "Electrician", "Motor rewinding", "Spoken English", "Personality Development",
        "Travel & Tourism", "Tailoring", "Tally", "Marketing", 
        "Communication Skills in English", "Computer Accounting and Tally",
        "MSCIT", "Beautician", "Screen Printing", "Competitive Exam",
        "Human Rights", "Environmental Studies",
      ],
    },
  ];

  return (
    <>
      <div className="w-full max-w-5xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center border-b-2 pb-2">
          {coursesData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg rounded-b-lg text-sm sm:text-base font-medium 
              ${activeTab === tab.id ? "bg-[#00A99D] text-white" : "bg-gray-200 text-gray-700"}
              transition-all`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Course List */}
        <div className="p-4">
          {coursesData
            .filter((tab) => tab.id === activeTab)
            .map((tab) => (
              <ul key={tab.id} className="space-y-2">
                {tab.courses.map((course, index) => (
                  <li key={index} className="text-gray-800 font-serif">
                    • {course}
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
