import React from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  mobileMenuOpen: boolean | undefined;
  setMobileMenuOpen: (value: boolean) => void;
};

const navigation = [
  { name: "Road Map", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Reviews", href: "#" },
];

export default function NavBar({ mobileMenuOpen, setMobileMenuOpen }: Props) {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
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
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-white px-2 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 transform -translate-y-1"
          >
            Sign up
          </a>
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
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
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
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
