import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  sidebarOpen: boolean | undefined;
  setSidebarOpen: (value: boolean) => void;
  setContent: (value: any) => void;
};

export default function Hero({
  sidebarOpen,
  setSidebarOpen,
  setContent,
}: Props) {
  const seeItInActionContent = {
    summary: [
      "This panel is the product. It's a chrome extension that summarizes articles for you in real time.",
      "The summaries help you understand the content faster, and decide whether a piece of content is worth reading.",
      "It works by extracting the content from the page you're reading, sending it off to a language model to be summarized, and then displaying the summary in this panel.",
      "It's completely free to use, it's even leverages the generous free tier of Google's Gemini model.",
      "Installation is easy, install it from the Chrome Store, login, and input your Gemini API and you're good to go.",
      "This tool is in active development and I'm adding features all the time - check out the roadmap to see what's coming up and vote on upcoming features.",
    ],
    takeaways: [
      "Real-time content summaries can supercharge your reading experience: your comprehension will improve and you'll be a more efficient reader.",
      "This chrome extension is free to use and easy to install.",
      "The tool is in active development and is currently the worst it will ever be.",
    ],
  };

  const handleClick = () => {
    setSidebarOpen(!sidebarOpen);
    setContent(seeItInActionContent);
  };

  return (
    <div className="relative isolate pt-14">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="flex">
            <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <Link href="/roadmap" className="flex items-center gap-x-1">
                <span className="font-semibold text-indigo-600">
                  Product Roadmap
                </span>
                <div className="h-full hidden sm:inline-block">
                  <span
                    className="text-gray-900/10 text-lg mx-2"
                    aria-hidden="true"
                  >
                    |
                  </span>
                  <span className="absolute inset-0" aria-hidden="true" />
                  See Upcoming Features
                </div>

                <ChevronRightIcon
                  className="-mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
          <h1 className="mt-10 max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Snap Summaries <br />
            Deep Understanding
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Transform the way you consume written content. Our tool cuts through
            the clutter to bring you directly to the pivotal points of every
            article, saving your time and enhancing comprehension.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <button
              onClick={handleClick}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              See it in Action
            </button>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              View in Chrome Store <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow"></div>
      </div>
    </div>
  );
}
