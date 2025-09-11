import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";

export default function Hostel() {
  return (
    <div className="bg-gray-100">
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
          Hostel 
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
          <span className="text-yellow-400 uppercase">Hostel </span>
        </div>
      </div>
      {/* Hostel Information Section */}
      <section className="w-[95%] max-w-6xl bg-white flex flex-col items-center mx-auto shadow-lg rounded-xl mt-10 p-8 border-t-4 border-teal-600">
        <h2 className="text-3xl font-bold text-black">Hostel Facilities</h2>
        <div className="flex items-center justify-center w-full mt-4">
          <hr className="flex-1 border-t-2 border-gray-400 w-1/4" />
          <Image src="/images/hostel.webp" alt="Hostel Icon" width={50} height={50} className="mx-4" />
          <hr className="flex-1 border-t-2 border-gray-400 w-1/4" />
        </div>
        <p className="text-gray-700 text-lg text-center mt-4 max-w-3xl leading-relaxed">
          Most students seeking admission come from rural areas. To support their education, hostel facilities are provided in 21 colleges, with 11 hostels for girls and 10 for boys. These hostels are well-equipped and available at reasonable fees.
        </p>
      </section>

      {/* Earn and Learn Scheme Section */}
      <section className="w-[95%] max-w-6xl bg-white flex flex-col items-center mx-auto shadow-lg rounded-xl mt-10 p-8 border-t-4 border-teal-600">
        <h3 className="text-3xl font-bold text-black flex items-center">
          <Image src="/images/earnlearn.png" alt="Earn and Learn" width={60} height={40} className="mr-3" />
          Earn and Learn Scheme
        </h3>
        <p className="text-gray-700 text-lg text-center mt-4 max-w-3xl leading-relaxed">
          Many colleges run the <strong className="text-teal-700">‘Earn and Learn Scheme’</strong> for economically disadvantaged students, offering free education. This scheme significantly benefits girl students, ensuring their continued education.
        </p>
      </section>

      {/* Statistics Section */}
      <section className="w-[95%] max-w-6xl bg-white flex flex-col items-center mx-auto shadow-lg rounded-xl mt-10 p-8 border-t-4 border-teal-600">
        <h3 className="text-3xl font-bold text-black">Hostel Gallery</h3>
        

        {/* Hostel Image Gallery */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {["/images/hostel1.jpg", "/images/hostel2.jpg", "/images/hostel3.jpg", "/images/hostel4.jpg", "/images/hostel5.jpg", "/images/hostel6.jpg"].map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md">
              <Image src={src} alt={`Hostel Image ${index + 1}`} width={300} height={200} className="object-cover w-full h-48" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}