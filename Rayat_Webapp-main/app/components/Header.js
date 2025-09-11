import Image from "next/image";
import YouTubeLiveButton from "./YouTubeLiveButton"; // ✅ इम्पोर्ट करा

const Header = () => {
  return (
    <div className="bg-white w-full">
      <div className="flex items-center justify-between p-6 max-w-screen-xl mx-auto shadow-md">
        {/* Left Logo */}
        <Image
          src="/images/rayat.png"
          alt="Rayat Logo"
          width={80}
          height={80}
        />

        {/* Center Text */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-wide">
            Rayat Shikshan Sanstha
          </h1>
          <h2 className="text-lg font-light">Founder Dr. Karmaveer Bhaurao Patil</h2>
          <h4 className="text-lg font-semibold text-red-500">Satara - 415 001</h4>
        </div>

        {/* Right Side: KBP Logo + YouTube Live Button */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/kbp.png"
            alt="KBP Logo"
            width={80}
            height={80}
          />
          <div className="fixed top-27 right-0 z-50">
                <YouTubeLiveButton />
               </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
