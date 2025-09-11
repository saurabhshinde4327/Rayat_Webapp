"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";

export default function StudentActivities() {
  return (
    <div className="bg-gray-100 text-gray-900">
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
          Student Activities & Facilities
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
          <span className="text-yellow-400">Student Activities</span>
        </div>
      </div>

      <div className="container mx-auto p-6">

        <p className="text-lg text-gray-700 leading-relaxed">
          On behalf of Sanstha and its Colleges, numerous educational and material facilities are
          provided to students to ensure their all-round development and enhance their academic
          standards.
        </p>

        <div className="mt-8 space-y-6">
          <section className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-teal-900">Academic & Educational Facilities</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Library facility with extensive resources</li>
              <li>Well-equipped classrooms & laboratories</li>
              <li>Computer education & Biotechnology courses</li>
              <li>Placement Cell & Career Guidance</li>
              <li>Scholarships & Student Insurance Scheme</li>
              <li>Guidance for Competitive Exams (NET, SET, M.Phil, Ph.D.)</li>
              <li>Foreign education assistance</li>
            </ul>
          </section>

          <section className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-teal-900">Co-curricular & Extra Activities</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>National Service Scheme (NSS) & National Cadet Corps (NCC)</li>
              <li>State & National level competitions (Quiz, Elocution, Arts)</li>
              <li>Sports & Cultural Programs</li>
              <li>Health Awareness & Blood Donation Camps</li>
              <li>Soft Skills & Personality Development Programs</li>
              <li>Women Empowerment & Counseling Sessions</li>
            </ul>
          </section>

          <section className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-teal-900">Student Welfare & Financial Support</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Earn and Learn Scheme</li>
              <li>Student Aid Fund & Book Bank Scheme</li>
              <li>Hostel & Internet Facilities</li>
              <li>Medical Check-ups & Health Centers</li>
              <li>Financial assistance for economically backward students</li>
              <li>Scholarships for SC, ST, OBC, EBC, and Minority Students</li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}