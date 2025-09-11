// components/LibraryButton.js
export default function LibraryButton() {
  return (
    <a
      href="http://hrms.rayatshikshan.edu/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-teal-500 text-white font-semibold px-4 py-2 rounded hover:bg-teal-600 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path d="M12 4.5C10.62 4.5 9.14 4.83 7.69 5.31C6.64 5.66 6 6.59 6 7.69V18.32C6 18.77 6.47 19.05 6.86 18.84C8.4 18.04 10.13 17.5 12 17.5C13.87 17.5 15.6 18.04 17.14 18.84C17.53 19.05 18 18.77 18 18.32V7.69C18 6.59 17.36 5.66 16.31 5.31C14.86 4.83 13.38 4.5 12 4.5ZM12 2C13.66 2 15 3.34 15 5C15 6.66 13.66 8 12 8C10.34 8 9 6.66 9 5C9 3.34 10.34 2 12 2Z" />
      </svg>
     HRMS Login
    </a>
  );
}
