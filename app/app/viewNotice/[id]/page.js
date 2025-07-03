"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ViewNotice() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchNotice = async () => {
      try {
        const res = await fetch(`/api/getNotices?id=${id}`);
        const data = await res.json();
        setNotice(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setNotice(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!notice) return <div className="text-center py-20 text-red-600">Notice not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-2">{notice.title}</h1>
        <p className="mb-4 text-gray-600">{notice.date}</p>
        {notice.file_path ? (
          <iframe
            src={notice.file_path}
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            title="Notice PDF"
          />
        ) : (
          <p className="text-red-500">PDF not found.</p>
        )}
        <div className="mt-4">
          <a
            href={notice.file_path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
