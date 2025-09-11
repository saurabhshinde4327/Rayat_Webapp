'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import Link from "next/link";

const KVP = () => {
  const Tabs = () => {
    const [activeTab, setActiveTab] = useState(1);

    const tabsData = [
      {
        id: 1,
        name: 'Biography',
        content: (
          <>
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-2 p-4 lg:p-0">
              <motion.div
                className="w-full lg:w-2/3 text-justify px-4 lg:px-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h2 className="text-[9vw] sm:text-[7vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] font-bold text-cyan-700 pb-2 font-mono">
                  Biography
                </h2>
                <p className="text-gray-900 text-sm sm:text-base">
                  Dr. Karmaveer Bhaurao Patil was born on 22 September 1887 at Kumbhoj in the Kolhapur district of Maharashtra. He was a prominent social reformer, educationist, and freedom fighter who dedicated his life to the upliftment of the underprivileged through education. Deeply influenced by the teachings of Mahatma Jyotirao Phule and Shahu Maharaj, he believed that education was the most powerful tool for social change.
                  <br /><br />
                  In 1919, he founded the Rayat Shikshan Sanstha, one of the largest educational institutions in India, with the goal of bringing education to the rural masses, especially the marginalized communities. His “earn and learn” concept helped poor students access education. He was awarded the Padma Bhushan in 1959.
                </p>
              </motion.div>

              <motion.div
                className="w-full lg:w-1/3 flex justify-center items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
              >
               
              </motion.div>
            </div>

            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-2 p-4 lg:p-10">
              <motion.div
                className="w-full lg:w-1/3 flex justify-center items-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
              >
               
              </motion.div>

              <motion.div
                className="w-full lg:w-2/3 text-justify px-4 lg:px-16"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-gray-900 text-sm sm:text-base">
                  He was awarded the Padma Bhushan in 1959 by the Government of India for his immense contribution to education and social work.
                  <br /><br />
                  Dr. Patil passed away on 9 May 1959, but his legacy continues to inspire generations.
                </p>
              </motion.div>
            </div>
          </>
        ),
      },
      {
        id: 2,
        name: 'Contribution by Sou. Vahini',
        content: (
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-2 p-4 lg:p-0">
            <motion.div
              className="w-full lg:w-2/3 text-justify px-4 lg:px-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-[6vw] sm:text-[4.5vw] md:text-[3.5vw] lg:text-[2.8vw] xl:text-[2.2vw] font-bold text-cyan-700 pb-2 font-mono">
                Contribution by Sou. Vahini
              </h2>
              <p className="text-gray-900 text-sm sm:text-base">
                Sou. Laxmibai Patil, known as Vahini, was the wife of Karmaveer Bhaurao Patil. While Karmaveer was the visionary, Vahini was the silent force of strength behind him. She provided unwavering emotional and practical support throughout his journey in establishing Rayat Shikshan Sanstha. <br /><br />
                Her sacrifices, determination, and resilience contributed immensely to the success of the mission for social change through education.
              </p>
            </motion.div>

            <motion.div
              className="w-full lg:w-1/3 flex justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              
            </motion.div>
          </div>
        ),
      },
      {
        id: 3,
        name: 'Social Activities',
        content: (
          <div className="flex flex-col lg:p-10 gap-10 justify-center items-center">
            <div className="relative w-2/3 sm:w-1/2 md:w-full lg:w-1/2">
              <Image
                src="/images/rayat1.jpg"
                alt="Social activities"
                className="shadow-lg rounded-lg"
                width={500}
                height={500}
              />
            </div>
            <div>
              <ul className="list-disc list-inside text-gray-900 text-sm sm:text-base px-4 lg:px-16">
                <li>Participation in Shikshan Prasarak Mandal, Dudhgaon in 1909.</li>
                <li>Founded Rayat Shikshan Sanstha at Kale in 1919.</li>
                <li>Opened hostel at Nerle in 1921.</li>
                <li>Started Rajarshi Chhatrapati Shahu Maharaj Boarding in 1924.</li>
                <li>Established Union Boarding House at Pune in 1932.</li>
                <li>Registered Rayat Shikshan Sanstha and started Training College in 1935.</li>
              </ul>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="w-full">
        <HeaderSection />
        <Header />
        <Navbar />

        {/* Hero Banner */}
        <section className="relative w-full h-[100px]">
          <Image
            src="/images/academics-banner.jpg"
            alt="Academics"
            layout="fill"
            objectFit="cover"
            className="opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg">HISTORY</h3>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-teal-900 text-white py-3">
          <div className="container mx-auto flex justify-center space-x-2 text-sm">
            <Link href="/" className="flex items-center space-x-1 hover:text-yellow-400">
              <span>🏠</span><span>Home</span>
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-yellow-400">HISTORY</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'bg-cyan-700 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-cyan-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">{tabsData.find((tab) => tab.id === activeTab)?.content}</div>

        <Footer />
      </div>
    );
  };

  return <div className="min-h-screen bg-white"><Tabs /></div>;
};

export default KVP;
