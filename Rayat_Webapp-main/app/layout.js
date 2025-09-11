import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient"; // 👈 Import the new file

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Server-side metadata allowed here
export const metadata = {
  title: "rayatshiksha",
  icons: {
    icon: "/images/logo.png", // ✅ Make sure this exists in /public/images
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
