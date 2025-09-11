
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Link from "next/link";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const quickLinks = [
  { name: "Karmaveer Vidyaprabodhini", url: "http://www.erayat.org" },
  { name: "Rayat Vdnyan Parishad", url: "http://www.rvprayatshikshan.co.in" },
];

// const libraryLinks = [
//   { id: 1, college: "Arts & Commerce College, Pusegaon", library: "Arts & Commerce College, Pusegaon", url: "http://libreria.org.in/Libpusegaon" },
//   { id: 2, college: "Shripatroa Kadam Mahavidyalaya, Shirval", library: "SKM Library", url: "http://libreria.org.in/SKMLibShirval" },
//   { id: 3, college: "Swami Sahajanand Bharati College of Education, Shrirampur", library: "S.S.B.College, Library", url: "http://libreria.org.in/SSBEDLIBShrirampur" },
//   { id: 4, college: "Bharatratna Dr. Babasaheb Ambedkar College Aundh, Pune 07", library: "Chitale-Tulpule Library", url: "http://libreria.org.in/BACLIBAUNDH" },
//   { id: 5, college: "Chandrabai-shantappa shendure College, Hupari", library: "Chandrabai-shantappa shendure College, Hupari", url: "http://libreria.org.in/CSSLibhupari" },
//   // Add more colleges as needed
// ];

export default function QuickLinks() {
  return (
    <div>
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
          <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg">
            QUICK LINKS
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
          <span className="text-yellow-400">Quick Links</span>
        </div>
      </div>

      

      {/* Quick Links Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-yellow-400 pb-2 mb-4">General Links</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map((link, index) => (
            <li key={index} className="bg-white shadow-lg p-4 rounded-lg hover:bg-yellow-100">
              <Link href={link.url} target="_blank" className="text-blue-600 font-semibold hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Library Links Section */}
      {/* <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-yellow-400 pb-2 mb-4">Library Links</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-300 p-2">Sr. No.</th>
                <th className="border border-gray-300 p-2">College Name</th>
                <th className="border border-gray-300 p-2">Library Name</th>
                <th className="border border-gray-300 p-2">URL</th>
              </tr>
            </thead>
            <tbody>
              {libraryLinks.map((link) => (
                <tr key={link.id} className="odd:bg-gray-100 even:bg-white hover:bg-yellow-50">
                  <td className="border border-gray-300 p-2 text-center">{link.id}</td>
                  <td className="border border-gray-300 p-2">{link.college}</td>
                  <td className="border border-gray-300 p-2">{link.library}</td>
                  <td className="border border-gray-300 p-2">
                    <Link href={link.url} target="_blank" className="text-blue-600 hover:underline">
                      Visit Library
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

      <Footer />
    </div>
  );
}
