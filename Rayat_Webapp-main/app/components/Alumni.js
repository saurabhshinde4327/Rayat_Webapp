"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Alumni() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await fetch("/api/getAlumni");
        const data = await response.json();
        setAlumni(data);
      } catch (error) {
        console.error("Failed to fetch alumni:", error);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <div className="relative w-full min-h-[200px] bg-white flex flex-col justify-center items-center py-4">
      <h2 className="text-3xl font-bold text-center mb-3">Our Alumni</h2>
      <div className="flex items-center justify-center w-full mb-4">
        <hr className="border border-black w-1/5" />
        <Image src="/images/logohr.png" alt="logo" width={50} height={40} className="mx-3" />
        <hr className="border border-black w-1/5" />
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-4xl min-h-[180px] border-2 border-white shadow-md">
        {/* Alumni Gallery Section */}
        <div className="w-full lg:w-3/4 bg-white flex justify-center items-center p-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {alumni.map((alumnus) => (
              <div key={alumnus.id} className="relative w-[90px] sm:w-[110px] overflow-hidden rounded-lg shadow-sm group">
                <Image
                  src={alumnus.file_path} // Use Image component
                  alt={alumnus.title}
                  width={200} // Set appropriate width
                  height={200} // Set appropriate height
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full text-black text-xs font-bold py-1 px-2 text-center bg-white bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity">
                  {alumnus.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Info Section */}
        <div className="w-full lg:w-1/4 bg-[#0C3B39] flex flex-col justify-center items-center text-white p-3">
          <h1 className="text-center font-serif text-sm sm:text-lg leading-snug">
            Rayat Shikshan Sanstha <br /> Alumni Association
          </h1>
        </div>
      </div>
    </div>
  );
}
