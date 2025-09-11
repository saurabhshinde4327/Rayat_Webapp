"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeaderSection from "../../components/HeaderSection";
import Header from "../../components/Header";
import Link from "next/link";

export default function ViewTender() {
  const { id } = useParams();
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchTender = async () => {
      try {
        const res = await fetch(`/api/getTenders?id=${id}`);
        const data = await res.json();
        setTender(Array.isArray(data.tenders) ? data.tenders[0] : data.tenders);
      } catch (err) {
        console.error("Error fetching tender:", err);
        setTender(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTender();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <HeaderSection />
        <Header />
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tender details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );

  if (!tender)
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <HeaderSection />
        <Header />
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tender Not Found</h2>
            <p className="text-gray-600 mb-4">
              The tender you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/tender"
              className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Back to Tenders
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeaderSection />
      <Header />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-teal-900 text-white py-3">
        <div className="container mx-auto flex justify-center space-x-2 text-sm">
          <Link href="/" className="flex items-center space-x-1 hover:text-yellow-400">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <span className="text-gray-400">›</span>
          <Link href="/tender" className="hover:text-yellow-400">Tenders</Link>
          <span className="text-gray-400">›</span>
          <span className="text-yellow-400">View Tender</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tender Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{tender.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <span className="flex items-center">
                <span className="mr-2">📅</span>
                <span>
                  Date:{" "}
                  {new Date(tender.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </span>
              {tender.tender_number && (
                <span className="flex items-center">
                  <span className="mr-2">🔢</span>
                  <span>Tender No: {tender.tender_number}</span>
                </span>
              )}
            </div>
            {tender.description && (
              <p className="text-gray-700 mb-4">{tender.description}</p>
            )}
          </div>

          {/* PDF Viewer */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tender Document</h2>
            {tender.file_path ? (
              <div>
                <iframe
                  src={tender.file_path}
                  width="100%"
                  height="600px"
                  style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                  title="Tender PDF"
                  className="mb-4"
                />
                <div className="flex justify-between items-center">
                  <a
                    href={tender.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <span className="mr-2">📄</span>
                    Open in New Tab
                  </a>
                  <a
                    href={tender.file_path}
                    download
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span className="mr-2">⬇️</span>
                    Download PDF
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-red-500 text-6xl mb-4">📄</div>
                <p className="text-red-500 text-lg">PDF document not available.</p>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <Link
              href="/tender"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="mr-2">←</span>
              Back to All Tenders
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
