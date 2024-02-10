import { useState } from "react";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

import Nav from "../components/NavBar";
import Hero from "../components/Hero";
import ArticleCarousel from "../components/ArticleCarousel";
import HowsItWork from "@/components/HowsItWork";
import SidePanel from "@/components/SidePanel";
import Footer from "@/components/Footer";

const secondaryFeatures = [
  {
    name: "Read Faster",
    description:
      "Reading a summary of an article before you start the text frees mental capacity and allows you to more easily comprehend the points the author is trying to get across.",
    href: "#",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Digest Faster",
    description:
      "Because you know the points the author will make in advance, you spend less time trying to understand arguments and more time thinking about them.",
    href: "#",
    icon: LockClosedIcon,
  },
  {
    name: "Decide Faster",
    description:
      "Some content just isn't worth our time. Summaries allow you to quickly decide if you want to invest your time in a piece of content.",
    href: "#",
    icon: ArrowPathIcon,
  },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState({ summary: [], takeaways: [] });

  return (
    <div className="bg-gray-50">
      <Nav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <SidePanel
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        content={content}
        setContent={setContent}
      />

      <main>
        {/* Hero section */}
        <Hero
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setContent={setContent}
        />

        <ArticleCarousel
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setContent={setContent}
          //@ts-ignore
          selectedArticle={content.main_idea}
        />

        {/* Feature section */}
        <HowsItWork />

        {/* Feature section */}
        <Features2 />

        {/* Newsletter section */}
        <Newsletter />

        {/* Testimonials section */}
        {/* <Testimonials /> */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const Features2 = () => {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">
          You but faster
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Read, Digest, Decide, Faster
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Access to instant content summaries supercharges your efficiency.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {secondaryFeatures.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <feature.icon
                  className="h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

const Newsletter = () => {
  const [status, setStatus] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //@ts-ignore
    let email = document.getElementById("email-address").value;
    fetch("/api/addToEmailList", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).then((res) => {
      if (res.status === 200) {
        setStatus(true);
      }
    });
  };

  return (
    <div className="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Want product updates?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          I rarely send product updatees (maybe 4x per year). If your into that
          kind of thing, this&apos;ll help - at the very least - it&apos;ll help
          you remember you were interested at one point.
        </p>

        {!status ? (
          <form className="mx-auto mt-10 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Notify me
            </button>
          </form>
        ) : (
          <div className="mx-auto mt-10 flex justify-center max-w-md gap-x-4">
            <p className="text-white">Thanks for signing up!</p>
          </div>
        )}

        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient
              id="759c1415-0410-454c-8f7c-9a820de03641"
              cx={0}
              cy={0}
              r={1}
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
