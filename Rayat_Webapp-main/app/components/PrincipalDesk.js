"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlay, FaTimes } from "react-icons/fa";

const PrincipalDesk = () => {
  const desks = [
    {
      title: "President's Desk",
      name: "Hon’ble Padmavibhushan MP. Sharadrao Govindrao Pawar (D.Litt)",
      description:
        "The founder of Rayat Shikshan Sanstha, Padmabhushan Dr. Karmaveer Bhaurao Patil, emphasized the importance of education as a tool for societal transformation. He dedicated his life to educating the masses and marginalized communities. Inspired by his vision, the organization continues to make progress in various educational fields.",
      fullText: `The founder of Rayat Shikshan Sanstha, Padmabhushan Dr. Karmaveer Bhaurao Patil, emphasized the importance of education as a tool for societal transformation. He dedicated his life to educating the masses and marginalized communities. Inspired by his vision, the organization continues to make progress in various educational fields. In the academic year 2014–2015, the institution took significant strides in the field of science and technology. 
      A noteworthy achievement includes the establishment of the “Center for Innovation, Incubation, and Industry Interface (C-III)” to bridge the gap between education and industry. 
      This center provides students of schools and colleges with platforms for innovation and incubation. The institution has adopted modern technology like artificial intelligence, machine learning, the internet, and 3D printing, making it accessible to its students.
      Based on the theme "Global Marathi and Our Rayat Shikshan Sanstha," a global conference was organized in 2015. Thousands of students from various parts of the world got an opportunity to interact, which is a commendable initiative. The institution’s educators and leaders have made exemplary contributions in various fields. I sincerely appreciate their efforts.
      In the coming times, as the trends in education and technology continue to evolve rapidly, we are committed to building a competent, responsible, and forward-thinking student community through our education policies.
      We wish the institution continued progress and extend our heartfelt best wishes.`,
      image: "/images/sharadpawar.jpeg",
    },

    {
      title: "Chairman's Desk",
      name: "Hon’ble Chandrakant Narayan Dalvi, IAS(Retd)",
      description:
        "Padma Bhushan Dr. Karmaveer Bhaurao Patil, a great educationist, started Rayat Shikshan Sanstha in 1919 to provide education to poor and underprivileged children living in rural areas. Since then, the institution has always focused not just on increasing the number of students but also on improving the quality of education.",
      fullText: `Padma Bhushan Dr. Karmaveer Bhaurao Patil, a great educationist, started Rayat Shikshan Sanstha in 1919 to provide education to poor and underprivileged children living in rural areas. Since then, the institution has always focused not just on increasing the number of students but also on improving the quality of education. To achieve this, Rayat Sanstha has provided good facilities and skilled teachers. At the school level, various programs like Gurukul projects, computer labs, science labs, competitive exam coaching, and English speaking classes help students become talented and confident. In colleges, along with regular courses, skill-based programs are also offered to make students independent and job-ready. Rayat Sanstha is one of the leading institutions implementing the National Education Policy 2020 effectively.
This year, the institution has made special efforts in education by understanding the needs of students and society. As a result, students have achieved success in competitive exams and sports, which is truly impressive.
Under the leadership of Hon. MP Sharad Pawar, the institution is progressing well in all areas. The Vice Presidents Mrs. Jayashree Chougule, Mr. Arun Kadu-Patil, Mr. P.J. Patil, Mr. Mahendra Lad, and Adv. Ram Kandage, Vice Chairman Adv. Bhagirath Shinde, Organizer Dr. Anil Patil, department heads, managing council members, and other members have all given valuable support for the institution’s development.
Our Secretary Mr. Vikas Deshmukh, Joint Secretaries Principal Dr. Shivling Menkudale, Mr. B.N. Pawar, and Principal Dr. Rajendra More are working hard for the progress of the Sanstha. Their contribution is very important.
I also thank all officers, teachers, professors, well-wishers, parents, and students for their constant support.
With this, I end my message.
Thank you!`,
      image: "/images/CHAIRMAN.jpg",
    },

    {
      title: "Secretary's Desk",
      name: "Hon’ble Shri. Vikas Deshmukh, IAS(Retd)",
      description:
        "Padma Bhushan Dr. Karmaveer Bhaurao Patil firmly believed that education is the only way to uplift the common people. With this vision, he founded the Rayat Shikshan Sanstha. What started with a small hostel has now become a large educational movement, working like a guiding light across Maharashtra and Karnataka.",
      fullText: ` Padma Bhushan Dr. Karmaveer Bhaurao Patil firmly believed that education is the only way to uplift the common people. With this vision, he founded the Rayat Shikshan Sanstha. What started with a small hostel has now become a large educational movement, working like a guiding light across Maharashtra and Karnataka. In the academic year 2024–25, many office bearers and officials of the Sanstha have been selected for important positions and honored with prestigious awards.
       Dr. Anil Patil, the Organizer, received the ‘Chhatrapati Shahu Maharaj Pillar of Education’ and ‘SGU Icon’ awards for his contribution to education. General Body members Supriya Sule and Nilesh Lanke were elected as Members of Parliament (Lok Sabha), while Managing Council members Dilip Walse Patil and Dr. Vishwajeet Kadam were elected to the Maharashtra Legislative Assembly. Donor and council member Ramseth Thakur received the P.B. Kadu-Patil Social Revolution Award. 
       Meenatai Jagdhane was honored with the 'Laxmibai Bhaurao Patil Award' for her social and educational work. Dr. Munatajali Shekh was appointed as Professor of Practice at D.Y. Patil Education Society, Kolhapur. Sanjeev Patil was elected unopposed as a member of the Maharashtra Chamber of Commerce. Raigad division chairman Balaram Patil received the Best Speaker Award and Lokmat Lokneta Award. West division chairman Chetan Tupe was elected as a Member of the Legislative Assembly and also received the Best Parliamentarian Award.
        Under the guidance of President Hon. MP Sharad Pawar, Vice Presidents, Chairman Chandrakant Dalvi, Vice Chairman Adv. Bhagirath Shinde, Organizer Dr. Anil Patil, General Body members, and Managing Council members, the Sanstha is moving strongly towards excellence.
         I sincerely thank everyone for their support and extend my best wishes for continued success in the field of education. `,
      image: "/images/SECRETY.jpeg",
    },
  ];

  const [selectedDesk, setSelectedDesk] = useState(null);

  const handleReadMore = (desk) => setSelectedDesk(desk);
  const closeModal = () => setSelectedDesk(null);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-6">
      {/* Divider with Logo */}
      <div className="flex items-center justify-center w-full mb-5">
        <hr className="border border-black w-1/4" />
        <div className="relative mx-4 w-[60px] h-[50px]">
          <Image src="/images/logohr.png" alt="logo" fill className="object-contain" />
        </div>
        <hr className="border border-black w-1/4" />
      </div>

      <h2 className="text-4xl font-bold text-black text-center mb-8">
        Chairman & Secretary Desk
      </h2>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center gap-10 max-w-7xl mx-auto px-4">
        {desks.map((desk, index) => (
          <div
            key={index}
            className="relative group bg-white rounded-2xl shadow-2xl p-8 w-full md:w-1/2 hover:shadow-indigo-200 transition-all duration-300"
          >
            <span className="absolute left-0 top-0 h-full w-1 bg-indigo-300 rounded-tr-xl rounded-br-xl"></span>

            <div className="flex items-center gap-6 mb-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-200 shadow-md">
                <Image
                  src={desk.image}
                  alt={desk.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{desk.title}</h3>
                <p className="text-sm text-gray-600">{desk.name}</p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{desk.description}</p>

            <div
              onClick={() => handleReadMore(desk)}
              className="flex items-center cursor-pointer text-teal-900 hover:underline transition duration-200"
            >
              <FaPlay className="mr-2 group-hover:animate-pulse" />
              <span className="font-medium">Read More</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDesk && (
        <div className="fixed inset-0 flex justify-center items-center z-50 px-4 backdrop-blur-sm bg-white/30">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in border border-gray-300">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition text-xl"
            >
              <FaTimes />
            </button>

            <div className="flex items-center gap-6 mb-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-200">
                <Image
                  src={selectedDesk.image}
                  alt={selectedDesk.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedDesk.title}</h3>
                <p className="text-sm text-gray-600">{selectedDesk.name}</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedDesk.fullText}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default PrincipalDesk;
