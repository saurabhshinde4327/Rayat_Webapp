import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import Image from "next/image";  // Import Image component from next/image
import Link from "next/link";

export default function StyledSchoolTable() {
  const ashramshalas = [
    { id: 1, name: "Rajarshi Ch.Shahu Maharaj Prathmik And Madhyamik Ashram Shala, Adoshi", headMaster: "Shri.Arane Ramesh Ramchandra", district: "Thane", address: "Adashi, Tal-Mokhada, Dist.-Thane", courses: "1st to 10th Standard" },
    { id: 2, name: "Mahatma Jotiba Phule Prathmik And Madhyamik Ashram Shala, Ase", headMaster: "Shri.Lahare H.M. (Incharge)", district: "Thane", address: "Ase, Tal-Mokhada, Dist.-Thane", courses: "1st to 10th Standard" },
    { id: 3, name: "Maharshi Vitthal Ramji Shinde Prathmik And Madhyamik Ashram Shala, Mokhada", headMaster: "Shri.Nikumbh Sunil Pandurang (Incharge)", district: "Thane", address: "Mokhada, Tal-Mokhada, Dist.-Thane", courses: "1st to 10th Standard" },
    { id: 4, name: "Kranti Jyoti Savitribai Phule Prathmik And Madhyamik Ashram Shala, Chambharshet", headMaster: "Shri.Choudhari Vitthal Baban (Incharge)", district: "Thane", address: "Chambharshet, Tal-Javhar, Dist.-Thane", courses: "1st to 10th Standard" },
    { id: 5, name: "Prathmik & Madhyamik Ashram Shala, Wavar", headMaster: "Shri.Randhir Manohar Fakira", district: "Thane", address: "Wavar, Tal-Javhar, Dist.-Thane", courses: "1st to 10th Standard" },
    { id: 6, name: "Prathmik And Madhyamik Ashram Shala, Narmadanagar", headMaster: "Shri.Shelake Arjun Laxman", district: "Nandurbar", address: "Narmadanagar, Tal-Taloda, Dist.-Nandurbar", courses: "1st to 10th Standard" },
    { id: 7, name: "Karmaveer Bhaurao Patil Prathmik & Madhyamik Ashram Shala, Pimpaldari", headMaster: "Shri.Malav Dhananjay Shivaram", district: "Ahmednagar", address: "Pimpaldari, Tal-Akole, Dist.-Ahmednagar", courses: "1st to 10th Standard" },
    { id: 8, name: "Dr.Babasaheb Ambedkar Prathmik And Madhyamik Ashram Shala, Kharshet", headMaster: "Shri.Gaurdkar Arun Dagdu", district: "Nashik", address: "Kharshet, Tal-Trayambakeshwar, Dist.-Nashik", courses: "1st to 10th Standard" }
  ];

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <HeaderSection />
        <Header />
        <Navbar />

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
              Ashramshala
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
            <span className="text-yellow-400 uppercase"> Ashramshala</span>
          </div>
        </div>

        <div className="w-[95%] max-w-6xl bg-[#E0F2F1] flex flex-col items-center mx-auto shadow-lg rounded-tl-[80px] rounded-br-[80px] mt-5 mb-5 border-t-[5px] border-b-[5px] border-[#00A99D] p-10">
          <h2 className="text-[22px] sm:text-[25px] text-black font-serif text-center">
            Rayat Shikshan Sanstha, Satara - Adivasi Ashramshala Department
          </h2>

          <div className="flex items-center justify-center w-full mt-2">
            <hr className="flex-1 border-t-2 border-black sm:w-1/4 w-1/6" />
            <Image
              src="/images/tree.png"
              alt="logo"
              width={60}
              height={60}
              className="h-12 sm:h-16 mx-4"
            />
            <hr className="flex-1 border-t-2 border-black sm:w-1/4 w-1/6" />
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full border border-gray-400 min-w-[800px] text-sm sm:text-base">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border p-2">Sr. No</th>
                  <th className="border p-2">Ashramshala Name</th>
                  <th className="border p-2">Head Master Name</th>
                  <th className="border p-2">District</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Courses</th>
                </tr>
              </thead>
              <tbody>
                {ashramshalas.map((ashramshala) => (
                  <tr key={ashramshala.id} className="odd:bg-white even:bg-gray-300 text-black">
                    <td className="border p-2 text-center">{ashramshala.id}</td>
                    <td className="border p-2">{ashramshala.name}</td>
                    <td className="border p-2">{ashramshala.headMaster}</td>
                    <td className="border p-2">{ashramshala.district}</td>
                    <td className="border p-2">{ashramshala.address}</td>
                    <td className="border p-2">{ashramshala.courses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
