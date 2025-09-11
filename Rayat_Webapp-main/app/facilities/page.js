import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

export default function Libraries() {
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
          <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg uppercase">
            Libraries
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
          <span className="text-yellow-400 uppercase">Libraries</span>
        </div>
      </div>

      <div className="w-[95%] max-w-6xl bg-[#E0F2F1] flex flex-col items-center mx-auto shadow-[0_5px_10px_rgba(0,0,0,0.25)] rounded-tl-[80px] rounded-br-[80px] mt-5 mb-5 border-t-[5px] border-b-[5px] border-[#00A99D] p-6">
        <h2 className="text-[22px] sm:text-[25px] text-black font-serif text-center">
          Library: The Soul of Our College
        </h2>

        <div className="flex items-center justify-center w-full mt-2">
          <hr className="flex-1 border-t-2 border-black sm:w-1/4 w-1/6" />
          <Image
            src="/images/tree.png"
            alt="logo"
            className="h-12 sm:h-16 mx-4"
            width={64}
            height={64}
          />
          <hr className="flex-1 border-t-2 border-black sm:w-1/4 w-1/6" />
        </div>

        {/* Image & Info Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-6 gap-6">
          {/* Image */}
          <div className="w-full sm:w-1/2 flex justify-center">
            <Image
              src="/images/library1.jpg"
              alt="Library Image"
              width={400}
              height={300}
              className="rounded-lg shadow-lg object-cover"
              priority
              quality={75}
            />
          </div>

          {/* Info */}
          <div className="w-full sm:w-1/2 text-black text-justify p-5">
            <p>
              Library is the soul of every college. The books in the library enrich
              the depth of the students&apos; knowledge. With this view, every library in
              the Sanstha&rsquo;s Colleges is carefully managed to include a variety of
              books.
            </p>
            <p className="mt-4">
              Currently, there are{" "}
              <span className="font-semibold text-teal-900">1,538,349 books</span>{" "}
              available across the{" "}
              <span className="font-semibold text-teal-900">41 colleges</span> run by
              the Sanstha. The collection includes fiction, textbooks, reference
              books, periodicals, and access to internet resources. Additionally,
              study room facilities are provided.
            </p>
            <p className="mt-4">
              The Sanstha is also working towards implementing the &#39;Libreria&#39; software
              in collaboration with Maharashtra Knowledge Corporation Ltd, Pune.
            </p>
          </div>
        </div>
      </div>

      {/* Library Features Section */}
      <div className="w-[95%] max-w-6xl bg-white flex flex-col items-center mx-auto shadow-[0_5px_10px_rgba(0,0,0,0.25)] rounded-tl-[50px] rounded-br-[50px] mt-5 mb-5 p-6">
        <h2 className="text-[22px] sm:text-[25px] text-black font-serif text-center mb-4">
          Key Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {[{
              src: "/images/DigitalResources.png",
              title: "Digital Resources",
              text: "Access thousands of e-books and research papers online."
            },
            {
              src: "/images/studyroom1.png",
              title: "Study Rooms",
              text: "Quiet spaces designed for focused learning."
            },
            {
              src: "/images/studyroom.png",
              title: "Experienced Librarians",
              text: "Our expert librarians are here to assist you."
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#E0F2F1] p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <Image
                src={feature.src}
                alt={feature.title}
                width={60}
                height={50}
                className="rounded-full shadow-md object-contain"
                priority
                quality={50}
              />
              <h3 className="text-xl font-bold text-teal-900 mt-3">{feature.title}</h3>
              <p className="mt-2">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
