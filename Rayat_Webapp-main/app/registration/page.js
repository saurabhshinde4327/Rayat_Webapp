"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import Image from "next/image"; // Importing Image component from next/image

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const router = useRouter();

  // Fetch regions on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("/api/regions"); // Updated API route
        setRegions(response.data); // Assuming response.data is an array of regions
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchRegions();
  }, []);

  // Fetch schools based on selected region
  useEffect(() => {
    const fetchSchools = async () => {
      if (selectedRegion) {
        try {
          const response = await axios.get(`/api/schools?region_id=${selectedRegion}`); // Updated API route
          setSchools(response.data); // Assuming response.data contains the schools
        } catch (error) {
          console.error("Error fetching schools:", error);
        }
      }
    };

    fetchSchools();
  }, [selectedRegion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    try {
      const response = await axios.post("/api/register", { email, password, selectedRegion, selectedSchool }); // Updated API route

      if (response.data.success) {
        Swal.fire("Success", "Registration successful!", "success").then(() => {
          router.push("/schoollogin");
        });
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          {/* Logo Image using next/image */}
          <Image
            src="/images/rayat.png" // Add the path to your logo
            alt="Logo"
            width={96} // Adjust the width and height as needed
            height={96} // Adjust the width and height as needed
            className="mx-auto mb-4" // Adjust the class as needed
          />
          <h2 className="text-2xl font-bold text-gray-800">Create a New Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Region Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Region</label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 shadow-sm"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              required
            >
              <option value="">Select a Region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          {/* Schools Dropdown (Based on Region) */}
          {selectedRegion && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Select School</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 shadow-sm"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                required
              >
                <option value="">Select a School</option>
                {schools.map((school) => (
                  <option key={school.school_id} value={school.school_id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 shadow-sm"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 shadow-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 shadow-sm"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-lg font-semibold shadow-md"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/schoollogin" className="text-teal-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
