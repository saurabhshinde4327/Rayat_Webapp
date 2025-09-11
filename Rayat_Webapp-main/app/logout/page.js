"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Clear any user session data if needed
    router.push("/login");
  }, [router]);

  return <p className="text-center mt-10">Logging out...</p>;
}