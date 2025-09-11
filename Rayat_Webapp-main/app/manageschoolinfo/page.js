"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarSchool from "../components/SidebarSchool";
import SchoolTopbar from "../components/SchoolTopbar";

export default function AddSchoolInfo() {
  const [schoolId, setSchoolId] = useState(null);
  const [principalName, setPrincipalName] = useState("");
  const [vicePrincipalName, setVicePrincipalName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [established, setEstablished] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [facilities, setFacilities] = useState("");
  const [achievements, setAchievements] = useState("");
  const [message, setMessage] = useState("");
  const [studentStdDivision, setStudentStdDivision] = useState([]);
  const [std, setStd] = useState("");
  const [division, setDivision] = useState("");
  const [stdCount, setStdCount] = useState("");
  const [medium, setMedium] = useState("");
  const [scholarshipResult, setScholarshipResult] = useState("");
  const [sscResult, setSscResult] = useState("");
  const [hscResult, setHscResult] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchSchoolId = async () => {
      try {
        const response = await fetch("/api/getSchoolId", { credentials: "include" });
        const data = await response.json();
        if (data.school_id) {
          setSchoolId(data.school_id);
        } else {
          setMessage("Error: School ID not found. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching school_id:", error);
        setMessage("Error fetching school ID.");
      }
    };

    fetchSchoolId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !principalName ||
      !vicePrincipalName ||
      !contact ||
      !email ||
      !address ||
      !studentCount ||
      !facilities ||
      !achievements
    ) {
      setMessage("All required fields must be filled.");
      return;
    }

    if (!schoolId) {
      setMessage("Error: Invalid school ID. Please log in again.");
      return;
    }

    try {
      const response = await fetch("/api/addSchoolInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_id: schoolId,
          principalName,
          vicePrincipalName,
          contact,
          email,
          address,
          established,
          affiliation,
          studentCount,
          facilities,
          achievements,
          studentStdDivision,
          medium, // <-- add medium
          scholarshipResult, // <-- add scholarship result
          sscResult, // <-- add ssc result
          hscResult, // <-- add hsc result
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Information submitted successfully!");
        setPrincipalName("");
        setVicePrincipalName("");
        setContact("");
        setEmail("");
        setAddress("");
        setEstablished("");
        setAffiliation("");
        setStudentCount("");
        setFacilities("");
        setAchievements("");
        setStudentStdDivision([]);
        router.push("/manageschoolinfo");
      } else {
        setMessage(data.error || "Failed to submit information.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting information. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarSchool
        setActiveSection={(section) => {
          const routes = {
            addEvent: "/adddocuments",
            manageEvents: "/managedocuments",
            addSchoolInfo: "/addschoolinfo",
            manageSchoolInfo: "/manageschoolinfo",
            addSchoolNew: "/addschoolnews",
            manageSchoolNew: "/manageschoolnews",
            addRecentsActivity: "/addschoolactivity",
            manageRecentsActivities: "/manageschoolactivity",
            addRecentEvents: "/addschoolevents",
            manageRecentEvents: "/manageschoolevents",
          };
          router.push(routes[section] || "/");
        }}
      />
      <div className="flex-1 flex flex-col">
        <SchoolTopbar />
        <main className="flex-1 p-4 overflow-hidden">
          <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded shadow max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Add School Information</h2>
            {message && <p className="text-red-600 mb-4 text-center">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Principal Name" value={principalName} onChange={setPrincipalName} required />
                <Input label="Vice Principal Name" value={vicePrincipalName} onChange={setVicePrincipalName} required />
                <Input label="Contact" value={contact} onChange={setContact} required />
                <Input label="Email" value={email} onChange={setEmail} type="email" required />
                <Input label="Address" value={address} onChange={setAddress} required />
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
                <div className="font-semibold mb-2">Add Std/Division wise Student Count</div>
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <input type="text" placeholder="Std" value={std} onChange={e => setStd(e.target.value)} className="border p-1 rounded w-full sm:w-1/4" />
                  <input type="text" placeholder="Division" value={division} onChange={e => setDivision(e.target.value)} className="border p-1 rounded w-full sm:w-1/4" />
                  <input type="number" placeholder="Count" value={stdCount} onChange={e => setStdCount(e.target.value)} className="border p-1 rounded w-full sm:w-1/4" />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Textarea label="Facilities" value={facilities} onChange={setFacilities} required />
                <Textarea label="Achievements" value={achievements} onChange={setAchievements} required />
                <Input label="Scholarship Result" value={scholarshipResult} onChange={setScholarshipResult} />
                <Input label="SSC Result" value={sscResult} onChange={setSscResult} />
                <Input label="HSC Result (If Junior college attached)" value={hscResult} onChange={setHscResult} />
              </div>
              <button type="submit" className="bg-teal-900 text-white p-2 rounded w-full mt-2">
                Submit Information
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

// Reusable Input component
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
