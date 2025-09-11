import HeaderSection from "../components/HeaderSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AimsObjects() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeaderSection />
      <Header />
      <Navbar />

      {/* Aims & Objects Section */}
      <section className="container mx-auto my-12 max-w-5xl p-6 bg-white rounded-xl shadow-xl">
        <div className="flex items-center justify-center mb-6 space-x-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-black uppercase">
            Aims & Objects
          </h2>
        </div>
        <p className="text-gray-700 text-justify mb-4">
          The aims &amp; objects of the Rayat Shikshan Sanstha shall be:
        </p>
        <ul className="list-decimal list-inside space-y-3 text-gray-700">
          <li>
            to impart generally to the rising generation of India &amp; in particular to the
            residents of Maharashtra, a liberal &amp; vocational education from Pre-primary to
            University level, embodying a social, cultural, scientific, technical, medical, legal,
            agricultural, commercial, industrial and physical training.
          </li>
          <li>to train suitable teachers for the above purposes;</li>
          <li>to train village workers for the upliftment of villages and rural industries;</li>
          <li>
            to open free libraries and reading rooms, hostels, residential and ordinary schools,
            colleges, Autonomous colleges, University, Research Institution, Distance Education and
            Educational Projects and such other institutions as may be conducive to the attainment
            of the aims and objects of the Sanstha, as circumstances permit;
          </li>
          <li>
            to do all lawful things and acts as are incidental or conducive to the attainment of any
            of the aforesaid aims and objects;
          </li>
        </ul>
        <p className="text-gray-700 text-justify mt-6">
          The Rayat Shikshan Sanstha shall provide facilities for the education of the poor by
          providing means to &apos;Earn while They Learn&apos; on the principle of Self-Help. The
          institutions of the Sanstha shall be so conducted to make no distinction of sex, region,
          religion, caste, creed or class and to be free from tuition fees as far as possible. The
          Sanstha shall be non-political. The members of the Managing Council of the Sanstha, the
          Life Members, the teachers and the employees of the Sanstha shall not engage themselves
          in any political activities within the precincts of the institutions of the Sanstha. The
          students in its institutions shall not take any active part in politics and shall devote
          their entire attention to the furtherance of education.
        </p>
      </section>

      <Footer />
    </div>
  );
}
