import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {};

export default function SidePanel({
  sidebarOpen,
  setSidebarOpen,
  content,
  setContent,
}: {
  sidebarOpen: boolean | undefined;
  setSidebarOpen: (value: boolean) => void;
  content: any; // Consider using a more specific type here if possible
  setContent: (value: any) => void;
}) {
  const sidebarClass = !sidebarOpen
    ? "transform translate-x-0"
    : "transform -translate-x-full";

  const handleClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className={`fixed top-0 -right-[100%] w-screen sm:right-[-450px] sm:w-[450px] h-screen bg-white z-[90] overflow-y-scroll shadow-lg p-4 pt-8 transition-transform duration-500 ease-in-out ${sidebarClass}`}
    >
      <button
        className="hover:bg-gray-200 absolute top-2 right-2"
        onClick={handleClose}
      >
        <XMarkIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
      </button>

      {/* Section 1 */}
      <div className="relative">
        <span className="text-lg font-bold text-gray-600 ml-4 px-2 bg-white z-[92] relative">
          Summary
        </span>
        <hr className="absolute top-[14px] w-full border-gray-900 z-[91]" />
      </div>

      <ul className="mt-4 mx-4 font-extralight text-[15px]">
        {content?.summary?.map((item: any, i: number) => {
          return (
            <li
              className="flex items-start list pb-[10px]"
              key={i}
              style={{ position: "relative" }}
            >
              <span
                className="text-gray-600 h-[18px]"
                style={{ position: "absolute", left: "-0px", top: "-4px" }}
              >
                -
              </span>
              <span className="text-gray-600 pl-4 leading-[18px]">{item}</span>
            </li>
          );
        })}
      </ul>

      {/* Section 2 */}
      <div className="relative mt-8">
        <span className="text-lg font-bold text-gray-600 ml-4 px-2 bg-white z-[92] relative">
          Take Aways
        </span>
        <hr className="absolute top-[14px] w-full border-gray-900 z-[91]" />
      </div>

      <ul className="mt-4 mx-4 font-extralight text-[15px] ">
        {content?.takeaways?.map((item: any, i: number) => {
          return (
            <li
              className="flex items-start list pb-[10px]"
              key={i}
              style={{ position: "relative" }}
            >
              <span
                className="text-gray-600 h-[18px]"
                style={{ position: "absolute", left: "-0px", top: "-4px" }}
              >
                -
              </span>
              <span className="text-gray-600 pl-4 leading-[18px]">{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
