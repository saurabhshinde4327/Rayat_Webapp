'use client';

import { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = { name, email, message, department };

    try {
      const response = await fetch('/api/submitFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        alert('Thank you for your feedback!');
        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
        setDepartment('');
      } else {
        alert('There was an issue submitting your feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an issue submitting your feedback.');
    }
  };

  // List of departments (Replace these with actual departments)
  const departments = [
    "Establishment",
    "Higher Education",
    "Secondary Education",
    "Junior College",
    "Leagal",
    "Property/Land/Agriculture",
    "Audit",
    "Account",
    "Record",
    "Karmaveer Vidya Prabhodhini",
    "IT",
    
  ];

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col">
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
              feedback
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
            <span className="text-yellow-400 uppercase"> feedback</span>
          </div>
        </div>

        {/* Feedback Form Section */}
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-extrabold text-center mb-6">Feedback Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option value="" disabled>Select your department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
