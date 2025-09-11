"use client";
import React, { useState } from 'react';

const AboutUsPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About Us</h1>
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Organization Section */}
          <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-6 focus:outline-none"
              onClick={() => toggleSection('organization')}
            >
              <h2 className="text-xl font-semibold text-gray-800">Organization</h2>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${openSection === 'organization' ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSection === 'organization' && (
              <div className="p-6 pt-0 text-gray-600">
                <p>
                  Our organization is built on a foundation of innovation, collaboration, and excellence. We strive to
                  create meaningful impact through our work and empower our team to achieve their full potential.
                </p>
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-6 focus:outline-none"
              onClick={() => toggleSection('history')}
            >
              <h2 className="text-xl font-semibold text-gray-800">History</h2>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${openSection === 'history' ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSection === 'history' && (
              <div className="p-6 pt-0 text-gray-600">
                <p>
                  Founded in 2010, our journey began with a small team of passionate individuals. Over the years, we have
                  grown into a global organization, delivering innovative solutions to clients worldwide.
                </p>
              </div>
            )}
          </div>

          {/* Achievements Section */}
          <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-6 focus:outline-none"
              onClick={() => toggleSection('achievements')}
            >
              <h2 className="text-xl font-semibold text-gray-800">Achievements</h2>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${openSection === 'achievements' ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSection === 'achievements' && (
              <div className="p-6 pt-0 text-gray-600">
                <ul className="list-disc list-inside">
                  <li>Winner of the 2022 Innovation Award.</li>
                  <li>Recognized as a Top Employer in 2021.</li>
                  <li>Delivered over 500 successful projects globally.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Vision & Mission Section */}
          <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-6 focus:outline-none"
              onClick={() => toggleSection('vision-mission')}
            >
              <h2 className="text-xl font-semibold text-gray-800">Vision & Mission</h2>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${openSection === 'vision-mission' ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSection === 'vision-mission' && (
              <div className="p-6 pt-0 text-gray-600">
                <h3 className="font-semibold text-gray-700">Vision</h3>
                <p>
                  To be a global leader in innovation and excellence, driving positive change in the world.
                </p>
                <h3 className="font-semibold text-gray-700 mt-4">Mission</h3>
                <p>
                  Our mission is to deliver exceptional solutions that empower our clients and create lasting value for
                  all stakeholders.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;