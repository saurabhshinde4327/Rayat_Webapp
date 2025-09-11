"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import Swal from 'sweetalert2';
import Image from 'next/image';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/schoolLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important for sessions
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("school_id", data.school_id);  // Store school_id
        Swal.fire("Success", "Login successful!", "success").then(() => {
          router.push("/dashboardschool");
        });
      } else {
        Swal.fire("Error", data.message, "error");
      }
      
    } catch (error) {
      Swal.fire("Error", "An error occurred", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          {/* Using Image component instead of img */}
          <Image
            src="/images/rayat.png"  // Path to your logo
            alt="Logo"
            width={80}  // Adjust width as needed
            height={80}  // Adjust height as needed
            className="mx-auto mb-4"  // Optional, adjust class if needed
          />
          <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
          <p className="text-sm text-gray-600">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 shadow-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-lg font-semibold shadow-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
// Removed dynamic import and SSR: false
