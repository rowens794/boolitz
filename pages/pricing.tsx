import { useState } from "react";
import { Disclosure, RadioGroup } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useSession, signIn, signOut } from "next-auth/react";

import Nav from "../components/NavBar";
import Footer from "@/components/Footer";

const pricing = {
  frequencies: [
    { value: "monthly", label: "Monthly", priceSuffix: "/month" },
    {
      value: "annually",
      label: "Annually",
      priceSuffix: "/year",
    },
  ],

  tiers: [
    {
      name: "Always Free Plan",
      id: "free-plan",
      href: "#",
      price: { monthly: "$0", annually: "$0" },
      description:
        "Get access to all features for free. All you need to do is bring your own Gemini API key, but that is also free.",
      features: [
        "Access to all features",
        "Easy to implement web summaries",
        "Free self-serve setup guide",
        "Enhanced reading comprehension",
      ],
      mostPopular: false,
    },
    {
      name: "Also Free Plan",
      id: "also-free-plan",
      href: "#",
      price: { monthly: "$0", annually: "$0" },
      description:
        "This is the same exact plan (free). I just want to stress the fact that there is no paid tier, the tool is just free.",
      features: [
        "All features in the Always Free Plan, plus",
        "Well there's nothing else, it's the same plan",
      ],
      mostPopular: true,
    },
  ],
};
const faqs = [
  {
    question: "What does the extension actually do?",
    answer:
      "The idea is that every time you open a new article, the extension will automatically send the content of the article to the Gemini LLM with instructions on how to summarize it. In a few seconds, Gemini returns the summary, and it is displayed alongside the article. The intention is that the summary will help you decide if the article is worth reading and provide you with some initial context to aid in comprehension.",
  },
  {
    question: "Is this really free? What's the catch?",
    answer:
      "Yes, it's free. This is a hobby project for me, and I thought it might be fun to expand the scope to a publicly available Chrome extension. I suspect if others use it, they will provide some good ideas that will make it better for me. There is one caveat, though. You need to provide your own Google Gemini API key. Right now, Gemini is offering one free API call per second, which is more than enough to use the extension. However, Google could decide to start charging at some point in the future - use at your own risk.",
  },
  {
    question: "Are you going to track what I'm reading?",
    answer:
      "No, the articles you read are only ever sent from your browser to the Gemini API. The articles you are reading never touch my server - and anyway, I could not care less about what you're reading. This could change in the future, but not without you opting into additional services (see below).",
  },
  {
    question: "Where is this project heading?",
    answer:
      "If you are anything like me, you are absolutely fascinated with language models. I see so many useful ways to continue expanding the capabilities of this project. For instance: keeping track of every article you've ever read and identifying connections between content you might have forgotten about, allowing for custom instructions on how to summarize certain content (think instructions for a Reddit thread, an Amazon product review, or a WSJ article), allowing users to directly send content + summaries to their Kindle/Evernote/whatever. I'm sure there are dozens of other things I haven't thought of yet. I'm actively developing the project and hold voting for the next feature to implement on the roadmap page.",
  },
  {
    question: "Why just Gemini?",
    answer:
      "Because of Google's one free API call per second. If there's demand for adding other models, I'll do it. But right now, it's just Gemini.",
  },
  {
    question: "Are you going to try and monetize this in the future?",
    answer:
      "Maybe. I'm not opposed to turning this into a financially sustainable service, but I'll only do it if users are asking for features that require me to run expensive backend services. For instance, if I need to start housing user data, managing a vector database, or handling language model calls myself, then I'll probably start charging for those services. But I'll never charge for the extension itself. I'll also never sell your data or use it for anything other than improving the service. I generally try to live by the 'don't be an asshole' philosophy - if you think I am, let me know, and I'll course correct.",
  },
  {
    question: "Why do I need to create an account?",
    answer:
      "I get it, right now there is no functionality directly tied to your account. But I expect that to change soon. Rather than having a bunch of folks frustrated when suddenly the extension stops working because I can't attach some backend functionality to their extension, I opted to set up user credentialing from the start to avoid headaches (both on your part and on mine).",
  },
  {
    question: "Why can I only sign up with Google?",
    answer:
      "This will change soon. It just takes time to set up the other authentication methods. If you have a preference for which method I should add next, let me know (on the roadmap page). I suspect I'll do email next, but I'm open to suggestions.",
  },
  {
    question: "Wait. Is this a desktop-only extension?",
    answer:
      "Yes. And I'm just as irritated about it as you are. Apple really locks down their phone browser, so I can't imagine something like this would work on iPhone. It might work on Android, but I don't have an Android phone to develop it on. If you have an Android phone and want to help me test it, let me know.",
  },
  {
    question: "You keep saying 'let me know' - how do I do that?",
    answer:
      "Email me. I'm Ryan. I'd love it if someone took enough interest in this project to actually email me. My email is ryan@boolitz.com.",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);
  const { data: session } = useSession();

  return (
    <div className="bg-white">
      <Nav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="bg-gray-50">
        {/* Pricing section */}
        <div className="mx-auto mt-20 pt-20 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-base font-semibold leading-7 text-indigo-600">
              Pricing
            </h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              The Pricing is Simple
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            It&apos;s free to use the extension. That&apos;s it. It&apos;s just
            free.
          </p>
          <div className="mt-16 flex justify-center">
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
            >
              <RadioGroup.Label className="sr-only">
                Payment frequency
              </RadioGroup.Label>
              {pricing.frequencies.map((option) => (
                <RadioGroup.Option
                  key={option.value}
                  value={option}
                  className={({ checked }) =>
                    classNames(
                      checked ? "bg-indigo-600 text-white" : "text-gray-500",
                      "cursor-pointer rounded-full px-2.5 py-1"
                    )
                  }
                >
                  <span>{option.label}</span>
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-2xl">
            {pricing.tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "ring-2 ring-indigo-600"
                    : "ring-1 ring-gray-200",
                  "rounded-3xl p-8"
                )}
              >
                <h2
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                    "text-lg font-semibold leading-8"
                  )}
                >
                  {tier.name}
                </h2>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {/* @ts-ignore */}
                    {tier.price[frequency.value]}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {frequency.priceSuffix}
                  </span>
                </p>
                {session ? (
                  <button
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                        : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                      "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
                    )}
                  >
                    You&apos;ve already signed up!
                  </button>
                ) : (
                  <button
                    aria-describedby={tier.id}
                    onClick={() => signIn()}
                    className={classNames(
                      tier.mostPopular
                        ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                        : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                      "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
                    )}
                  >
                    Sign Up
                  </button>
                )}
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ section */}
        <div className="mx-auto mt-24 pb-24 max-w-7xl px-6 sm:mt-56 sm:pb-56 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <div>
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                Frequently asked questions
              </h2>
              <p className="text-gray-600 italic font-light">
                Ok, let&apos;s get some things out of the way.
              </p>
            </div>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                          <span className="text-base font-semibold leading-7">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <MinusSmallIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmallIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base leading-7 text-gray-600">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
