"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="min-w-10 h-10 w-10 flex justify-center items-center gap-2 font-medium tap-highlight-transparent hover:bg-gray-100 bg-gray-50 rounded-full"
      onClick={() => router.back()}
    >
      <svg
        className="text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M15 6L9 12.0001L15 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeMiterlimit="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </button>
  );
}
