import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

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
      className={`fixed top-0 -right-[100%] w-screen sm:right-[-450px] sm:w-[450px] h-screen bg-white z-[90] overflow-y-scroll shadow-lg p-4 pt-16 transition-transform duration-500 ease-in-out ${sidebarClass}`}
    >
      <PanelNav handleClose={handleClose} />

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

const PanelNav = ({ handleClose }: { handleClose: () => void }) => {
  const [pauseUrl, setPauseUrl] = useState(false);
  const [pauseDomain, setPauseDomain] = useState(false);

  return (
    <div className="fixed top-0 right-0 w-full h-12 bg-indigo-600 z-50 flex justify-between shadow-md">
      <div className="flex gap-4 justify-start mx-4 relative">
        <IconItem />

        <ActionButtons
          pauseUrl={pauseUrl}
          setPauseUrl={setPauseUrl}
          pauseDomain={pauseDomain}
          setPauseDomain={setPauseDomain}
        />
      </div>
      <CloseButton handleClose={handleClose} />
    </div>
  );
};

const IconItem = () => {
  return (
    <div className="group relative">
      <a href="https://www.boolitz.com" className="flex items-center mt-0.5">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded-full invert opacity-80"
        />
        <span className="absolute top-10 bg-gray-100 rounded-sm -right-[20px] px-1 text-xs w-22 text-center text-gray-700 shadow-md opacity-0 cursor-default group-hover:opacity-100 transition-opacity ">
          Homepage
        </span>
      </a>
    </div>
  );
};

const CloseButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <button className="mx-4" onClick={handleClose}>
      <XMarkIcon
        className="h-6 w-6 text-indigo-100 hover:bg-indigo-500 rounded-sm"
        aria-hidden="true"
      />
    </button>
  );
};

const ActionButtons = ({
  pauseUrl,
  setPauseUrl,
  pauseDomain,
  setPauseDomain,
}: {
  pauseUrl: boolean;
  setPauseUrl: (value: boolean) => void;
  pauseDomain: boolean;
  setPauseDomain: (value: boolean) => void;
}) => {
  return (
    <div className="flex justify-start gap-4">
      <div className="bg-indigo-700 h-10 mt-1 w-0.5" />
      <PauseOnDomain
        pauseDomain={pauseDomain}
        setPauseDomain={setPauseDomain}
      />
      <PauseOnURL pauseUrl={pauseUrl} setPauseUrl={setPauseUrl} />
    </div>
  );
};

const PauseOnDomain = ({
  pauseDomain,
  setPauseDomain,
}: {
  pauseDomain: boolean;
  setPauseDomain: (value: boolean) => void;
}) => {
  return (
    <div
      className="mt-2 group relative hover:bg-indigo-400 rounded-sm p-1 h-8 w-8 cursor-pointer"
      onClick={() => setPauseDomain(!pauseDomain)}
    >
      <HandRaisedIcon
        className={`h-6 w-6 ${
          pauseDomain ? "text-red-300" : "text-indigo-100"
        } `}
        aria-hidden="true"
      />
      <span className="text-[8px] font-white absolute top-6 -right-2 bg-indigo-500 rounded-full px-1">
        DOM
      </span>
      <span className="absolute top-9 bg-gray-100 rounded-sm -right-[40px] px-1 text-xs w-28 text-center text-gray-700 shadow-md opacity-0 cursor-default group-hover:opacity-100 transition-opacity ">
        Pause on Domain
      </span>
    </div>
  );
};

const PauseOnURL = ({
  pauseUrl,
  setPauseUrl,
}: {
  pauseUrl: boolean;
  setPauseUrl: (value: boolean) => void;
}) => {
  return (
    <div
      className="mt-2 group relative hover:bg-indigo-400 rounded-sm p-1 h-8 w-8 cursor-pointer"
      onClick={() => setPauseUrl(!pauseUrl)}
    >
      <HandRaisedIcon
        className={`h-6 w-6 ${pauseUrl ? "text-red-300" : "text-indigo-100"} `}
        aria-hidden="true"
      />
      <span className="text-[8px] font-white absolute top-6 -right-2 bg-indigo-500 rounded-full px-1">
        URL
      </span>
      <span className="absolute top-9 bg-gray-100 rounded-sm -right-[40px] px-1 text-xs w-24 text-center text-gray-700 shadow-md opacity-0 cursor-default group-hover:opacity-100 transition-opacity ">
        Pause on URL
      </span>
    </div>
  );
};
