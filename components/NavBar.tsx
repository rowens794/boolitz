import React from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Wendy_One } from "next/font/google";
const moirai = Wendy_One({ weight: "400", subsets: ["latin"] });

type Props = {
  mobileMenuOpen: boolean | undefined;
  setMobileMenuOpen: (value: boolean) => void;
};

const navigation = [
  { name: "Road Map", href: "/roadmap" },
  { name: "Pricing", href: "/pricing" },
  { name: "Boolitz Explained", href: "/explained" },
  {
    name: "Feedback",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSd5MqO7-REQ-zXFgCkr8ka8aisDYZDlsuLhn_b4seOyOIUiLg/viewform?usp=sf_link",
  },
];

export default function NavBar({ mobileMenuOpen, setMobileMenuOpen }: Props) {
  const { data: session } = useSession();

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-gray-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 ">
          <Link href="/" className="-m-1.5 p-1.5 flex flex-row">
            <Image
              className="h-8 w-auto"
              src="/images/logo-120.png"
              alt=""
              width={120}
              height={120}
            />
            <p
              className={`text-indigo-950 leading-8 italic ${moirai.className} text-2xl`}
            >
              Boolitz
            </p>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 relative">
          {navigation.map((item) => {
            if (item.name === "Pricing") {
              return (
                <div className="relative z-20" key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold leading-6 text-gray-900 static"
                  >
                    {item.name}
                  </a>
                  <span className="bg-green-800 text-white text-[10px] rounded-full px-1 py-0 absolute -top-1.5 -right-5">
                    Free
                  </span>
                </div>
              );
            } else {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              );
            }
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          {
            // if session exists, show sign out button
            session ? (
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => signIn()}
                >
                  Sign in
                </button>

                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-white px-4 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500"
                >
                  Sign up
                </a>
              </>
            )
          }
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex flex-row">
              <Image
                className="h-8 w-auto"
                src="/images/logo-120.png"
                alt=""
                width={120}
                height={120}
              />
              <p
                className={`text-indigo-950 leading-8 italic ${moirai.className} text-2xl`}
              >
                Boolitz
              </p>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {
                  // if session exists, show sign out button
                  session ? (
                    <button
                      type="button"
                      className="block rounded-lg px-3 py-2.5 border border-gray-200 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <button
                        type="button"
                        className="block rounded-lg px-3 py-2.5 border border-gray-200 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full"
                        onClick={() => signIn()}
                      >
                        Sign in
                      </button>

                      <button
                        type="button"
                        onClick={() => signIn()}
                        className="font-semibold leading-6 text-white px-4 py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-500 w-full"
                      >
                        Sign up
                      </button>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
