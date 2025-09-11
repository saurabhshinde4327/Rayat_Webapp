"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";

export default function StyledSchoolTable() {
  const schools = [
    { id: 1, name: "SATARA, MAHATMA PHULE ADHYAPAK VIDYALAYA", principal: "-", atPost: "SATARA", taluka: "SATARA", district: "SATARA", stdCode: "2162", phone: "239283" },
    { id: 2, name: "SATARA, JIJAMATA ADHYAPIKA VIDYALAYA", principal: "PATIL MANGAL SHRIDHAR", atPost: "SATARA", taluka: "SATARA", district: "SATARA", stdCode: "2162", phone: "238133" },
    { id: 3, name: "KUSUR, PANDURANG DESAI ADHYAPAK VIDYALAYA", principal: "KAMBALE BALU MUKUND", atPost: "KUSUR", taluka: "KARAD", district: "SATARA", stdCode: "2164", phone: "250261" },
    { id: 4, name: "ASHTA, LATTHE ADHYAPAK VIDYALAYA", principal: "VANJARI BABURAO SHANKAR", atPost: "ASHTA", taluka: "WALWA", district: "SANGLI", stdCode: "2342", phone: "243341" },
    { id: 5, name: "MAHULI, VITTHALRAO DHESHMUKH ADHYAPAK VIDYALAYA", principal: "GODE GORAKSHNATH KONDAJI", atPost: "MAHULI", taluka: "KHANAPUR", district: "SANGLI", stdCode: "2347", phone: "264034" },
    { id: 6, name: "RUKADI, SHRI CHH. SHAHU ADHYAPAK VIDYALAYA", principal: "DONGARE UTTAM BANDU", atPost: "RUKADI", taluka: "HATKANANGALE", district: "KOLHAPUR", stdCode: "230", phone: "2585532" },
    { id: 7, name: "JAMGAON, MAHARAJA MADHAVRAO SHINDE JUNIOR COLLEGE OF EDU.", principal: "JAGDALE SOPAN SAKHARAM", atPost: "JAMGAON", taluka: "PARNER", district: "A.NAGAR", stdCode: "2488", phone: "273225" }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderSection />
      <Header />
      <Navbar />

      {/* Banner Section */}
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
            teacher training schools
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
          <span className="text-yellow-400 uppercase"> teacher training schools</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-[95%] max-w-6xl bg-[#E0F2F1] flex flex-col items-center mx-auto shadow-lg rounded-tl-[80px] rounded-br-[80px] mt-5 mb-5 border-t-[5px] border-b-[5px] border-[#00A99D] p-10">
        <h2 className="text-[22px] sm:text-[25px] text-black font-serif text-center">
          Teacher Training Schools
        </h2>

        <div className="flex items-center justify-center w-full mt-2">
          <hr className="flex-1 border-t-2 border-black sm:w-1/4 w-1/6" />
          <Image
            src="/images/tree.png"
            alt="logo"
            width={48} // Adjust the width and height accordingly
            height={48} // Adjust the width and height accordingly
            className="mx-4"
          />
          <hr className="flex-1 border-t-2 border-black sm:w-1/4 w-1/6" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border border-gray-400 min-w-[800px]">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border p-2">Sr. No</th>
                <th className="border p-2">School</th>
                <th className="border p-2">Principal&apos;s Name</th>
                <th className="border p-2">At/Post</th>
                <th className="border p-2">Taluka</th>
                <th className="border p-2">District</th>
                <th className="border p-2">Std Code</th>
                <th className="border p-2">Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="odd:bg-white even:bg-gray-300 text-black">
                  <td className="border p-2 text-center">{school.id}</td>
                  <td className="border p-2">{school.name}</td>
                  <td className="border p-2">{school.principal}</td>
                  <td className="border p-2">{school.atPost}</td>
                  <td className="border p-2">{school.taluka}</td>
                  <td className="border p-2">{school.district}</td>
                  <td className="border p-2 text-center">{school.stdCode}</td>
                  <td className="border p-2 text-center">{school.phone}</td>
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
