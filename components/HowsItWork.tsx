import React, { useEffect, useRef, useState } from "react";
import {
  ComputerDesktopIcon,
  GlobeAltIcon,
  CpuChipIcon,
} from "@heroicons/react/20/solid";

type Props = {};

const primaryFeatures = [
  {
    name: "Chrome Extension",
    description:
      "Our custom Chrome extension extracts text from the content you're reading.",
    icon: GlobeAltIcon,
  },
  {
    name: "Google Gemini",
    description:
      "The captured content is sent to Google's Gemini API for summarization.",
    icon: CpuChipIcon,
  },
  {
    name: "In-Browser Display",
    description:
      "The returned summary pops up right alongside the content you're reading.",
    icon: ComputerDesktopIcon,
  },
];

export default function HowsItWork({}: Props) {
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Trigger setSidebar(true) when the element is visible
        if (entries[0].isIntersecting) {
          setSidebar(true);
        } else {
          setSidebar(false);
        }
      },
      {
        root: null, // observing for viewport
        threshold: 0.75, // trigger when 10% of the element is visible
      }
    );

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }

    return () => {
      // Cleanup observer on component unmount
      if (sidebarRef.current) {
        observer.unobserve(sidebarRef.current);
      }
    };
  }, [setSidebar]);

  return (
    <div
      ref={sidebarRef}
      className="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8"
    >
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
          <div className="lg:row-start-2 lg:max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How Does it Work?
              <br />
              <span className="text-indigo-300">By Harnessing AI.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              A powerful AI reads each article alongside you and pulls out the
              most important ideas. Within seconds, it delivers a custom summary
              right alongside the content you&apos;re already reading.
            </p>
          </div>

          <SidePanel open={sidebar} />

          <div className="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-white/10 lg:pt-10">
            <dl className="max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
              {primaryFeatures.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt className="ml-9 inline-block font-semibold text-white">
                    <feature.icon
                      className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="inline ml-2">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div
          className="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

const seeItInActionContent = {
  summary: [
    "The chrome extension extracts text from the content you're currently reading and sends it to Google's Gemini API for summarization.",
    "Google returns the summary directly to your browser, where it's displayed alongside the content you're reading.",
    "You get the best of both worlds with every article you read: the full story as the author intended and the crib notes to enhance productivity.",
  ],
  takeaways: [""],
};

const SidePanel = ({ open }: { open: boolean }) => {
  const sidebarClass = !open
    ? "transform translate-x-0"
    : "transform -translate-x-full";

  return (
    <div
      className={`absolute top-8 right-[-450px] w-[450px] border-r border-gray-200 shadow-lg shadow-gray-600 bg-slate-100 rounded-l-md h-[calc(100%-64px)] hidden lg:block ${sidebarClass} transition-all duration-500 ease-in-out`}
    >
      <div className="p-4">
        {/* Section 1 */}
        <div className="relative">
          <span className="text-lg font-bold text-gray-600 ml-4 px-2 bg-gray-100 z-[92] relative">
            Summary
          </span>
          <hr className="absolute top-[14px] w-full border-gray-900 z-[91]" />
        </div>

        <ul className="mt-4 mx-4 font-extralight text-[15px] ">
          {seeItInActionContent?.summary?.map((item: any, i: number) => {
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
                <span className="text-gray-600 pl-4 leading-[18px]">
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
