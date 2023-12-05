import Link from "next/link";
import Scaffold from "../components/Scaffold";

export default function Component() {
  return (
    <Scaffold>
      <section className="w-full py-12 bg-white shadow-md max-h-full p-5 m-1 rounded-lg">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Grade 6 Physics Calendar
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Upcoming Classes and Events
            </p>
          </div>
          <ul className="mt-8 space-y-4">
            <li className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
              <div className="font-bold text-xl mb-2">
                Introduction to Forces
              </div>
              <p className="text-gray-700 text-base">
                Start the journey of understanding the fundamental forces.
              </p>
              <div className="mt-4 flex items-center">
                <IconCalendardays className="mr-2 h-5 w-5 text-gray-500" />
                <span className="font-medium">Dec 10, 2023</span>
              </div>
              <div className="mt-4">
                <Link
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  href="#"
                >
                  View Details
                </Link>
              </div>
            </li>
            <li className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
              <div className="font-bold text-xl mb-2">
                Gravity and Free Fall
              </div>
              <p className="text-gray-700 text-base">
                Dive deep into the concept of gravity and free fall.
              </p>
              <div className="mt-4 flex items-center">
                <IconCalendardays className="mr-2 h-5 w-5 text-gray-500" />
                <span className="font-medium">Dec 17, 2023</span>
              </div>
              <div className="mt-4">
                <Link
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  href="#"
                >
                  View Details
                </Link>
              </div>
            </li>
            <li className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
              <div className="font-bold text-xl mb-2">Magnetic Fields</div>
              <p className="text-gray-700 text-base">
                Learn about magnetic fields and their effects.
              </p>
              <div className="mt-4 flex items-center">
                <IconCalendardays className="mr-2 h-5 w-5 text-gray-500" />
                <span className="font-medium">Dec 24, 2023</span>
              </div>
              <div className="mt-4">
                <Link
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  href="#"
                >
                  View Details
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </Scaffold>
  );
}

function IconCalendardays(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
