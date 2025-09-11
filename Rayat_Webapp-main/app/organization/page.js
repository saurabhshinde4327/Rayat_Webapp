"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";

const tabs = ["Management", "Administration", "Committees", "Regional Offices"];
const councilMembers = [
  { name: "Hon'ble Chandrakant Narayan Dalvi, IAS(Retd)", image: "/organization/ChandrakantDalavi.jpg" },
  { name: "Hon'ble Adv. Bhagirath Nivrutti Shinde", image: "/organization/BhagirathShinde.jpeg" },
  // { name: "Ms. Pooja Sinha", image: "/images/member3.jpg" },
  // { name: "Mr. Arjun Patel", image: "/images/member4.jpg" },
  // { name: "Mr. Arjun Patel", image: "/images/member4.jpg" },
  // { name: "Mr. Arjun Patel", image: "/images/member4.jpg" }, 
  // { name: "Mr. Arjun Patel", image: "/images/member4.jpg" },
  // { name: "Mr. Arjun Patel", image: "/images/member4.jpg" },
  // { name: "Mr. Arjun Patel", image: "/images/member4.jpg" },
  // { name: "Mr. Arjun Patel", image: "/images/member4.jpg" },
  // { name: "Mr. Arjun Patel", image: "/images/member4.jpg" },
  // { name: "Mr. Arjun Patel", image: "/images/member4.jpg" },
  
];

const regionalOffices = [
  {
    name: "Rayat Shikshan Sanstha, Administrative Building",
    address: "3rd Floor- Inspector Office, Central Region, Satara, Phone: (02162)234279",
    image: "/regional/reg1.jpg",
  },
  {
    name: "Inspector Office",
    address: "Southern Region, Sangli. Phone:(0233)2330992, Fax:2333376",
    image: "/regional/reg2.jpg",
  },
  {
    name: "Inspector Office",
    address: "Northern Region, Ahmednagar. Phone:(0241)2323236, Fax:2328218",
    image: "/regional/reg3.jpg",
  },
  {
    name: "Inspector Office",
    address: "Western Region, Aundhgaon, Pune. Phone:(020)25888703, Fax:25890866",
    image: "/regional/reg4.jpg",
  },
];

export default function Organization() {
  const [activeTab, setActiveTab] = useState("Management");

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
           ORGANIZATION
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
          <span className="text-yellow-400">ORGANIZATION</span>
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
                activeTab === tab ? "border-teal-300 text-teal-500" : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "Management" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {councilMembers.map((member, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 text-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="mx-auto rounded-full border-4 border-blue-100"
                  />
                  <h3 className="mt-4 text-md sm:text-lg font-bold text-teal-900">{member.name}</h3>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Administration" && (
            <div className="bg-white shadow-md rounded-lg p-6 text-gray-700 text-justify">
              <h2 className="text-2xl font-bold text-dark text-center mb-4">Administration</h2>
              <p>
                The prominent feature of the Sanstha is its democratic administrative set-up. The Rayat Shikshan Sanstha is an educational
                institution belonging to the people, working for the people, and being administered by the people. Dr. Karamaveer Bhaurao Patil made
                it a point to safeguard it against any political domination. He welcomed all those who loved the Sanstha. As a result, the Sanstha
                today has been receiving ample cooperation and support, consistently from people of diverse political opinions.
              </p>
              <br />
              <div className="mt-6">
                <h3 className="text-l font-semibold text-black text-center mb-4">
                  Office Bearers of Rayat Shikshan Sanstha, Satara
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {councilMembers.map((member, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-4 text-center">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={120}
                        height={120}
                        className="mx-auto rounded-full border-4 border-blue-100"
                      />
                      <h3 className="mt-4 text-md sm:text-lg font-bold text-teal-900">{member.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Committees" && (
            <div className="flex justify-center mt-6">
              <Image
                src="/images/commiittee.jpg"
                alt="Committees"
                width={600}
                height={600}
                className="rounded-lg shadow-md"
              />
            </div>
          )}

{activeTab === "Regional Offices" && (
  <div className="text-gray-700 text-sm sm:text-lg text-center">
    <h2 className="text-2xl font-bold text-black">Regional Offices</h2>
    <p className="mt-4 text-md text-gray-600">
      Head office administers all 676 branches across 14 districts of Maharashtra and 1 district in Karnataka.
      The governing authorities function for all branches from this office. To ensure smooth and efficient
      operations, the management has established five regional offices.
    </p>
    
    {/* Grid Layout for 4 Images in One Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {regionalOffices.map((office, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
          <Image
            src={office.image}
            alt={office.name}
            width={300}
            height={200}
            className="mx-auto rounded-lg border-2 border-gray-300"
          />
          <h3 className="mt-4 text-lg font-bold text-teal-900">{office.name}</h3>
          <p className="text-sm text-gray-600 mt-2">{office.address}</p>
        </div>
      ))}
    </div>
  </div>
)}

        </div>
      </div>
      <Footer />
    </div>
  );
}
