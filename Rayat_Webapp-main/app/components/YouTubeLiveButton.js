// components/YouTubeLiveButton.js
export default function YouTubeLiveButton() {
  return (
    <a
      href="https://www.youtube.com/@rayatshikshansansthasatara/streams"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 bg-red-600 text-white font-semibold px-2 py-2 rounded hover:bg-red-700 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="15"
        height="20"
      >
        <path d="M10 15.5L16 12L10 8.5V15.5ZM12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3Z" />
      </svg>
      YouTube Live
    </a>
  );
}
