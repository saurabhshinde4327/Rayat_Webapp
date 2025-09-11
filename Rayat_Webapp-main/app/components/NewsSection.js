"use client";
import { useRouter } from "next/navigation";

const NewsSection = ({ title, items = [], link, openModal }) => {
  const router = useRouter();

  // Remove duplicate items
  const uniqueItems = Array.from(new Map(items.map(item => [item.title, item])).values());
  const duplicatedItems = [...uniqueItems, ...uniqueItems]; // Duplicate for seamless scrolling

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        
        {/* Fix: Ensure `title` is correctly checked */}
        {title && title === "Notices" ? (
  <button
    onClick={() => router.push("/notices")}
    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:opacity-80 transition duration-300"
  >
    VIEW ALL
  </button>
) : title && title === "Downloads" ? (
  <button
    onClick={() => router.push("/documents")} // Redirects to the downloads page
    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:opacity-80 transition duration-300"
  >
    VIEW ALL
  </button>
) : link ? (
  <button
    onClick={() => router.push(link)}
    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:opacity-80 transition duration-300"
  >
    VIEW ALL
  </button>
) : null}

      </div>

      {/* Auto-Scrolling News Container */}
      <div className="relative max-h-48 overflow-hidden">
        <div className="scroll-container">
          <div className="scroll-content space-y-4"> {/* Adds gap between items */}
            {duplicatedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                <span className="text-gray-700">{item.title}</span>
                <a href={item.pdf} download className="text-teal-900 hover:text-blue-700">📥</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind CSS & Hover Stop Animation */}
      <style jsx>{`
  .scroll-container {
    position: relative;
    height: 12rem;
    overflow: hidden;
  }
  .scroll-content {
    display: flex;
    flex-direction: column;
    /* 👇 इथे बदल करा */
    animation: scrollUp 25s linear infinite;
  }
  .scroll-container:hover .scroll-content {
    animation-play-state: paused;
  }
  @keyframes scrollUp {
    from { transform: translateY(0); }
    to { transform: translateY(-50%); }
  }
`}</style>

    </div>
  );
};

export default NewsSection;
