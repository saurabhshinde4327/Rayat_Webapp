'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const articles = [
  {
    title: "Rayat Shikshan Sanstha, Administrative Building",
    image: "/regional/reg1.jpg",
    description:
      "Rayat Shikshan Sanstha, Administrative Building 3rd Floor- Inspector Office, Central Region, Satara, Phone: (02162)234279",
  },
  {
    title: "Inspector Office, Southern Region, Sangli",
    image: "/regional/reg2.jpg",
    description:
      "Inspector Office, Southern Region, Sangli. Phone:(0233)2330992, Fax:2333376..",
  },
  {
    title: "Inspector Office, Northern Region, Ahmednagar",
    image: "/regional/reg3.jpg",
    description:
      "Inspector Office, Northern Region, Ahmednagar. Phone:(0241)2323236,Fax:2328218.",
  },
  {
    title: "Inspector Office, Western Region, Aundhgaon",
    image: "/regional/reg4.jpg",
    description:
      "Inspector Office, Western Region, Aundhgaon. Pune:(020)25888703 Fax:25890866.",
  },
];

export default function Region() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="flex flex-col items-center p-6 bg-white min-h-[45vh]">
      <h1 className="text-4xl font-bold text-center mb-5">Regional Offices</h1>
      <div className="flex items-center justify-center w-full mb-5">
        <hr className="border border-black w-1/4" />
        <Image src="/images/logohr.png" alt="logo" width={60} height={50} className="mx-4" />
        <hr className="border border-black w-1/4" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-lg overflow-hidden cursor-pointer shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedArticle(article)}
          >
            <Image 
              src={article.image} 
              alt={article.title} 
              className="w-full h-56 sm:h-64 object-cover brightness-75" 
              width={600} 
              height={400} 
              layout="responsive"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-lg font-bold text-center">{article.title}</h2>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="fixed inset-0  flex items-center justify-center z-50 p-4 backdrop-blur-md bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              className="rounded-lg shadow-lg w-full max-w-md sm:max-w-lg p-6 relative bg-white"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-56 sm:h-64 object-cover" 
                width={600} 
                height={400} 
                layout="responsive"
              />
              <h2 className="text-xl text-teal-900 font-bold mt-4 text-center">{selectedArticle.title}</h2>
              <p className="mt-2 text-black text-center">{selectedArticle.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
