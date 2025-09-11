"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SchoolProfile() {
  const { school_id } = useParams();
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [principalName, setPrincipalName] = useState("");
  const [vicePrincipalName, setVicePrincipalName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [motto, setMotto] = useState("");
  const [established, setEstablished] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [facilities, setFacilities] = useState("");
  const [achievements, setAchievements] = useState("");
  const [medium, setMedium] = useState("");
  const [scholarshipResult, setScholarshipResult] = useState("");
  const [sscResult, setSscResult] = useState("");
  const [hscResult, setHscResult] = useState("");
  const [studentStdDivision, setStudentStdDivision] = useState([]);
  const [std, setStd] = useState("");
  const [division, setDivision] = useState("");
  const [stdCount, setStdCount] = useState("");

  // Reusable fetch function
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/schoolinfo?school_id=${school_id}`);
      const data = await res.json();
      setSchoolInfo(data);
      if (data) {
        setPrincipalName(data.principal_name || "");
        setVicePrincipalName(data.vice_principal_name || "");
        setContact(data.contact || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
        setMotto(data.motto || "");
        setEstablished(data.established || "");
        setAffiliation(data.affiliation || "");
        setStudentCount(data.student_count || "");
        setFacilities(data.facilities || "");
        setAchievements(data.achievements || "");
        setMedium(data.medium || "");
        setScholarshipResult(data.scholarship_result || "");
        setSscResult(data.ssc_result || "");
        setHscResult(data.hsc_result || "");
        setStudentStdDivision(data.student_std_division ? JSON.parse(data.student_std_division) : []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, [school_id]);

  useEffect(() => {
    if (!school_id) return;
    fetchData();
  }, [school_id, fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/addSchoolInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_id,
          principalName,
          vicePrincipalName,
          contact,
          email,
          address,
          motto,
          established,
          affiliation,
          studentCount,
          facilities,
          achievements,
          studentStdDivision,
          medium,
          scholarshipResult,
          sscResult,
          hscResult,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Information updated successfully!");
        setEditMode(false);

        // Re-fetch the updated data
        await fetchData();
      } else {
        setMessage(data.error || "Failed to update information.");
      }
    } catch (error) {
      setMessage("Error updating information. Please try again.");
    }
  };

  if (!schoolInfo) {
    return (
      <div className="text-center py-20 text-blue-900 text-xl font-semibold">
        Loading School Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-12 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-4xl border border-blue-100">
        <div className="flex flex-col items-center space-y-4 mb-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <Image src="/images/rayat.png" alt="Rayat Logo" width={50} height={50} />
            <h1 className="text-2xl font-extrabold text-blue-900">{schoolInfo.school_name}</h1>
            <Image src="/images/kbp.png" alt="KBP Logo" width={50} height={50} />
          </div>
          <p className="italic text-blue-600 text-base">Education through self-help is our motto</p>
          <p className="text-gray-700 text-base">{schoolInfo.address}</p>
        </div>
        <hr className="my-4 border-t-2 border-blue-300" />
       
        {message && <p className="text-green-700 mb-4 text-center">{message}</p>}
        {editMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Principal Name" value={principalName} onChange={setPrincipalName} required />
              <Input label="Vice Principal Name" value={vicePrincipalName} onChange={setVicePrincipalName} required />
              <Input label="Contact" value={contact} onChange={setContact} required />
              <Input label="Email" value={email} onChange={setEmail} type="email" required />
              <Input label="Address" value={address} onChange={setAddress} required />
              <Input label="Motto" value={motto} onChange={setMotto} />
              <Input label="Established" value={established} onChange={setEstablished} />
              <Input label="Total Teachers" value={affiliation} onChange={setAffiliation} />
              <Input label="Total Students" value={studentCount} onChange={setStudentCount} type="number" required />
              {/* Medium Dropdown */}
              <div>
                <label className="block text-gray-700 mb-1">Medium</label>
                <select
                  value={medium}
                  onChange={e => setMedium(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Medium</option>
                  <option value="English">English</option>
                  <option value="Semi English">Semi English</option>
                  <option value="Marathi">Marathi</option>
                </select>
              </div>
            </div>
            {/* Std/Division wise student count section */}
            <div className="border p-3 rounded mb-2 bg-gray-50">
              <div className="font-semibold mb-2">Edit Std/Division wise Student Count</div>
              <div className="flex flex-col md:flex-row gap-2 mb-2">
                <input type="text" placeholder="Std" value={std} onChange={e => setStd(e.target.value)} className="border p-1 rounded w-full md:w-1/4" />
                <input type="text" placeholder="Division" value={division} onChange={e => setDivision(e.target.value)} className="border p-1 rounded w-full md:w-1/4" />
                <input type="number" placeholder="Count" value={stdCount} onChange={e => setStdCount(e.target.value)} className="border p-1 rounded w-full md:w-1/4" />
                <button type="button" className="bg-teal-700 text-white px-3 rounded" onClick={() => {
                  if(std && division && stdCount) {
                    setStudentStdDivision([...studentStdDivision, { std, division, count: Number(stdCount) }]);
                    setStd(""); setDivision(""); setStdCount("");
                  }
                }}>Add</button>
              </div>
              {/* Table of added std/division */}
              {studentStdDivision.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border">
                    <thead><tr><th className="border px-2">Std</th><th className="border px-2">Division</th><th className="border px-2">Count</th><th className="border px-2">Remove</th></tr></thead>
                    <tbody>
                      {studentStdDivision.map((row, idx) => (
                        <tr key={idx}>
                          <td className="border px-2">{row.std}</td>
                          <td className="border px-2">{row.division}</td>
                          <td className="border px-2">{row.count}</td>
                          <td className="border px-2"><button type="button" className="text-red-600" onClick={() => setStudentStdDivision(studentStdDivision.filter((_, i) => i !== idx))}>Remove</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea label="Facilities" value={facilities} onChange={setFacilities} required />
              <Textarea label="Achievements" value={achievements} onChange={setAchievements} required />
              <Input label="Scholarship Result" value={scholarshipResult} onChange={setScholarshipResult} />
              <Input label="SSC Result" value={sscResult} onChange={setSscResult} />
              <Input label="HSC Result (If Junior college attached)" value={hscResult} onChange={setHscResult} />
            </div>
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-teal-900 text-white p-2 rounded w-full">
                Save
              </button>
              <button type="button" className="bg-gray-300 text-gray-800 p-2 rounded w-full" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-blue-800 mb-1">📜 Established</h2>
                <p className="text-gray-700 text-base">{schoolInfo.established}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-blue-800 mb-1">👨‍🎓 Total Students</h2>
                <p className="text-gray-700 text-base">{schoolInfo.student_count}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-blue-800 mb-1">🎓 Total Teachers</h2>
                <p className="text-gray-700 text-base">{schoolInfo.affiliation}</p>
              </div>
              {/* Medium field */}
              <div className="md:col-span-3">
                <h2 className="text-lg font-semibold text-blue-800 mb-1">🌐 Medium</h2>
                <p className="text-gray-700 text-base">{schoolInfo.medium}</p>
              </div>
              {/* Results fields */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div>
                  <h2 className="text-lg font-semibold text-blue-800 mb-1">🏅 Scholarship Result</h2>
                  <p className="text-gray-700 text-base">{schoolInfo.scholarship_result}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-blue-800 mb-1">📝 SSC Result</h2>
                  <p className="text-gray-700 text-base">{schoolInfo.ssc_result}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-blue-800 mb-1">🏫 HSC Result</h2>
                  <p className="text-gray-700 text-base">{schoolInfo.hsc_result}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-3 rounded-lg shadow space-y-2">
                <h2 className="text-lg font-bold text-blue-900">🏫 School Management</h2>
                <p><strong className="text-blue-800">Principal:</strong> {schoolInfo.principal_name}</p>
                <p><strong className="text-blue-800">Vice Principal:</strong> {schoolInfo.vice_principal_name}</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg shadow space-y-2">
                <h2 className="text-lg font-bold text-blue-900">📞 Contact</h2>
                <p><strong className="text-blue-800">Phone:</strong> {schoolInfo.contact}</p>
                <p><strong className="text-blue-800">Email:</strong> {schoolInfo.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-bold text-blue-900 mb-1">🏆 Achievements</h2>
                <p className="text-gray-700 whitespace-pre-wrap text-sm">{schoolInfo.achievements}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-blue-900 mb-1">🏢 Facilities</h2>
                <p className="text-gray-700 whitespace-pre-wrap text-sm">{schoolInfo.facilities}</p>
              </div>
            </div>
            {/* Std/Division wise student count table */}
            {schoolInfo.student_std_division && (
              <div className="mt-6 bg-white p-4 rounded-xl shadow border border-blue-100 flex flex-col items-center">
                <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span role="img" aria-label="student">👨‍🎓</span> Student Count (Std & Division wise)
                </h2>
                <div className="overflow-x-auto w-full flex justify-center">
                  <table className="min-w-[400px] max-w-xl w-full table-auto border-collapse rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-blue-50 text-blue-900">
                        <th className="py-1 px-2 text-sm font-semibold border-b border-blue-100 text-center">Std</th>
                        <th className="py-1 px-2 text-sm font-semibold border-b border-blue-100 text-center">Division</th>
                        <th className="py-1 px-2 text-sm font-semibold border-b border-blue-100 text-center">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        let data = [];
                        try {
                          data = JSON.parse(schoolInfo.student_std_division);
                        } catch (e) {}
                        if (!Array.isArray(data) || data.length === 0) {
                          return (
                            <tr><td colSpan={3} className="text-center py-2 text-gray-400">No data</td></tr>
                          );
                        }
                        return data.map((row, idx) => (
                          <tr key={idx} className="hover:bg-blue-50 transition-colors">
                            <td className="py-1 px-2 border-b border-blue-50 text-blue-900 text-center text-sm">{row.std}</td>
                            <td className="py-1 px-2 border-b border-blue-50 text-blue-900 text-center text-sm">{row.division}</td>
                            <td className="py-1 px-2 border-b border-blue-50 text-blue-900 text-center text-sm">{row.count}</td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
        required={required}
      />
    </div>
  );
}

// Reusable Textarea component
function Textarea({ label, value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded min-h-[80px]"
        required={required}
      />
    </div>
  );
}
