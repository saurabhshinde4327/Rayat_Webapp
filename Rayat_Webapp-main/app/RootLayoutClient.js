"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayoutClient({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
