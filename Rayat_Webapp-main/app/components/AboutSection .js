import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="[background-color:hsl(184,50%,85%)]  py-16">
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Content Section */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Rayat Shikshan Sanstha</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto md:mx-0"></div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Rayat Shikshan Sanstha is a premier educational institution, renowned nationally and globally.
              Founded by Karmaveer Bhaurao Patil and supported by his wife, Sou. Laxmibai Patil, the institution
              has been dedicated to the noble mission of education and social upliftment.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Over the years, Rayat Shikshan Sanstha has expanded its reach, providing quality education to students
              from diverse backgrounds. With numerous schools, colleges, and professional institutes under its umbrella,
              it continues to empower the youth through knowledge and skill development.
            </p>
            <Link href="/about" className="text-blue-600 font-bold inline-block hover:text-blue-800 transition">
              Read More →
            </Link>
          </div>
          
          {/* Video Section */}
          <div className="relative w-full md:w-96 h-56 overflow-hidden shadow-lg rounded-lg">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/tiyIXgUqtEM"
              title="Rayat Shikshan Sanstha Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
