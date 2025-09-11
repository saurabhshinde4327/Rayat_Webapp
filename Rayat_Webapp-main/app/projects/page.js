"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";

const tabs = ["Academic", "Professional", "Social"];

const academicProjects = [
  { name: "AI Research", image: "/projects/", description: "Exploring AI-driven solutions for automation, including natural language processing, computer vision, and machine learning applications that enhance efficiency in various industries." },
  { name: "Eco-friendly Architecture", image: "/projects/eco.jpg", description: "Sustainable building designs for the future, incorporating renewable materials, energy-efficient structures, and green technology to reduce environmental impact." },
  { name: "Renewable Energy", image: "/projects/renewable.jpg", description: "Harnessing solar and wind energy innovations to create sustainable power sources, improve energy storage solutions, and contribute to a greener planet." },
  { name: "Blockchain Security", image: "/projects/blockchain.jpg", description: "Enhancing cybersecurity through blockchain by implementing decentralized systems that improve transparency, reduce fraud, and increase data security." },
  
];

const professionalProjects = [
  { name: "Leadership Training", image: "/projects/leadership.jpg", description: "Developing leadership skills through strategic training programs, executive coaching, and hands-on experience." },
  { name: "Corporate Networking", image: "/projects/networking.jpg", description: "Facilitating professional connections and collaborations across industries for career growth and development." },
  { name: "Project Management", image: "/projects/pm.jpg", description: "Enhancing project management skills with Agile, Scrum, and traditional methodologies for efficiency and success." },
  { name: "Technical Certification", image: "/projects/certification.jpg", description: "Offering industry-recognized certifications to boost career opportunities and technical expertise." },
  { name: "Entrepreneurship", image: "/projects/entrepreneurship.jpg", description: "Supporting startups with mentorship, funding resources, and business development strategies." }
];

const socialProjects = [
  { name: "Community Service", image: "/projects/community.jpg" },
  { name: "Mental Well-being Programs", image: "/projects/wellbeing.jpg" },
  { name: "Environmental Initiatives", image: "/projects/environment.jpg" },
  { name: "Volunteer Activities", image: "/projects/volunteer.jpg" },
  { name: "Diversity & Inclusion", image: "/projects/inclusion.jpg" }
];

export default function Organization() {
  const [activeTab, setActiveTab] = useState("Academic");

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
          projects
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
          <span className="text-yellow-400 uppercase">projects</span>
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
          {activeTab === "Academic" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {academicProjects.map((project, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 text-center">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={300}
                    height={200}
                    className="mx-auto rounded-lg border-2 border-gray-300"
                  />
                  <h3 className="mt-4 text-lg font-bold text-teal-900">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Professional" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {professionalProjects.map((project, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 text-center">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={300}
                    height={200}
                    className="mx-auto rounded-lg border-2 border-gray-300"
                  />
                  <h3 className="mt-4 text-lg font-bold text-teal-900">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Social" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {socialProjects.map((project, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 text-center">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={300}
                    height={200}
                    className="mx-auto rounded-lg border-2 border-gray-300"
                  />
                  <h3 className="mt-4 text-lg font-bold text-teal-900">{project.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}