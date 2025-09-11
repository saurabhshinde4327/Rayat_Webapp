"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SidebarSchool from "../components/SidebarSchool";
import SchoolTopbar from "../components/SchoolTopbar";


export default function Dashboard() {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    // Fetch school name from cookies
    const school_name = document.cookie
      .split("; ")
      .find((row) => row.startsWith("school_name="))
      ?.split("=")[1];

    if (school_name) {
      setSchoolName(decodeURIComponent(school_name));
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SidebarSchool Component */}
      <SidebarSchool setActiveSection={(section) => {
                    if  (section === "addEvent") {
                      router.push("/adddocuments");
                    } else if (section === "manageEvents") {
                      router.push("/managedocuments");
                    }else if (section === "addSchoolInfo") {
                        router.push("/addschoolinfo");
                      }else if (section === "manageSchoolInfo") {
                        router.push("/manageschoolinfo");
                      }else if (section === "addSchoolNew") {
                        router.push("/addschoolnews");
                      }else if (section === "manageSchoolNew") {
                        router.push("/manageschoolnews");
                        
                    }
                  }} />

      <div className="flex-1 flex flex-col">
        <SchoolTopbar />
        <main className="flex-1 p-8 flex flex-col items-center justify-center">
          <h1 className="text-gray-700 text-3xl font-bold">
            Welcome to {schoolName ? schoolName : "the Dashboard"}
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Manage news, notices, and more.
          </p>
        </main>
      </div>
    </div>
  );
}

