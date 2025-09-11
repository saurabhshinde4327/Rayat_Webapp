"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import NewsSection from "./NewsSection";

const ThreeSections = () => {
  const [circulars, setCirculars] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchCirculars = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setCirculars(
          data.map((item) => ({
            id: item.id,
            title: item.title,
            pdf: item.file_path,
          }))
        );
      } catch (error) {
        console.error("Error fetching circulars:", error);
      }
    };

    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notices");
        const data = await response.json();
        setNotices(
          data.map((item) => ({
            id: item.id,
            title: item.title,
            pdf: item.file_path,
          }))
        );
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchCirculars();
    fetchNotices();
  }, []);

  return (
    <div className="[background-color:hsl(184,50%,85%)] py-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">News</h1>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center w-full mb-5">
          <hr className="border border-black w-1/4" />
          <Image src="/images/logohr.png" alt="logo" width={60} height={50} className="mx-4" />
          <hr className="border border-black w-1/4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NewsSection title="Circulars" items={circulars} link="/circulars" />
          <NewsSection title="Notices" items={notices} link="/notices" />
        </div>
      </div>
    </div>
  );
};

export default ThreeSections;
