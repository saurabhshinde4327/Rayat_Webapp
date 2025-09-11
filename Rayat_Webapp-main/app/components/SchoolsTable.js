"use client";
import { useState } from "react";
import Link from "next/link";

const SchoolsTable = ({ schools }) => {
  const [search, setSearch] = useState("");

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto p-4">
      <input
        type="text"
        placeholder="Search schools..."
        className="w-full px-4 py-2 border rounded-lg mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-auto">
        <table className="w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">School Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school, index) => (
                <tr key={school.school_id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{school.name}</td>
                  <td className="border p-2">{school.type}</td>
                  <td className="border p-2">
                    <Link href={`/school-info/${school.school_id}`}>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-4 text-center">
                  No schools found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolsTable;
