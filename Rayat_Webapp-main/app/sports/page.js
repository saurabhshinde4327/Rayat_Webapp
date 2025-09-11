"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

export default function Sports() {
  return (
    <div className="bg-white text-gray-900">
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
          Sports
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
          <span className="text-yellow-400 uppercase">Sports</span>
        </div>
      </div>

      {/* Featured Sports */}
<section className="py-2 px-6 md:px-16">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
    {[
      { name: "Football", image: "/sports/football.png" },
      { name: "Basketball", image: "/sports/basketball.jpg" },
      { name: "Tennis", image: "/sports/tennis.jpg" },
      { name: "Cricket", image: "/sports/cricket.jpeg" },
      { name: "Swimming", image: "/sports/swimming.jpg" },
      { name: "Badminton", image: "/sports/Badminton.jpg" },
    ].map((sport, index) => (
      <div
        key={index}
        className="bg-gray-100 shadow-lg rounded-lg overflow-hidden p-4 flex flex-col items-center text-center"
      >
        <Image
          src={sport.image}
          width={100}
          height={100}
          alt={`${sport.name} Image`}
          className="rounded-full shadow-lg w-24 h-24 object-cover"
        />
        <h3 className="text-lg font-semibold mt-2">{sport.name}</h3>
      </div>
    ))}
  </div>
</section>

<br />
      {/* Upcoming Events */}
      <section className="py-16 px-6 md:px-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {["Championship Finals", "Inter-College Tournament", "Annual Sports Meet"].map((event, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-semibold">{event}</h3>
              <p className="text-gray-600 mt-2">Join us on {new Date().toLocaleDateString()} for an exciting competition!</p>
            </div>
          ))}
        </div>
      </section>

      
      <Footer />
    </div>
  );
}