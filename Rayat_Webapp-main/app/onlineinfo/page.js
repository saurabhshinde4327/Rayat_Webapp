"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";

export default function OnlineInfo() {
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/ai-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType, formData }),
    });
    if (res.ok) {
      alert("✅ डेटा सेव्ह झाला");
      setFormData({});
      setFormType(null);
    }
  };

  return (
    <div>
      <HeaderSection />
      <Header />
      <Navbar />

      {/* Banner Section */}
      <section className="relative w-full h-[100px]">
        <Image
          src="/images/academics-banner.jpg"
          alt="Academics"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg">
            Online Info
          </h3>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-teal-900 text-white py-3">
        <div className="container mx-auto flex justify-center space-x-2 text-sm">
          <Link href="/" className="flex items-center space-x-1 hover:text-yellow-400">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-yellow-400">Online Info</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6 px-4">
        <div className="text-center mt-8">
          <h2 className="text-xl font-semibold text-black">
            शाखा माहिती ऑनलाईन प्रणाली पोर्टल
          </h2>
          <a
            href="http://115.124.97.204/RAYATSATARA/pgeMain.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-teal-700 hover:bg-teal-400 text-white rounded-md transition"
          >
            पोर्टल पहा
          </a>
        </div>

        {/* AI Info Section */}
        <div className="mt-10 text-center">
           <h2 className="text-xl font-semibold text-black">
            AI माहिती भरण्यासाठी Online Form हवे आहे.
          </h2>
          <button
  className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-2 rounded shadow-md"
>
  <Link href="/ai-info">AI Info</Link>
</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
