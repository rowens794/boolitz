import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Wendy_One } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";

const moirai = Wendy_One({ weight: "400", subsets: ["latin"] });

type Props = {};

export default function login({}: Props) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <Link href="/" className="-m-1.5 p-1.5 flex flex-row">
            <Image
              className="h-8 w-auto"
              src="/images/logo-120.png"
              alt=""
              width={120}
              height={120}
            />
            <p
              // @ts-ignore
              className={`text-indigo-950 leading-8 italic ${moirai.className} text-2xl`}
            >
              Boolitz
            </p>
          </Link>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-2 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                >
                  <div className="bg-white p-2 rounded-full">
                    <svg
                      className="w-4"
                      viewBox="0 0 533.5 544.3"
                      aria-hidden="true"
                    >
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4 font-medium">Sign In with Google</span>
                </button>
              </div>

              <div className="my-12 font-light text-sm max-w-80 mx-auto text-center">
                <p>
                  I plan to offer alternative authentication methods in the
                  future, but for now, it&apos;s just Google.
                </p>
              </div>

              <div className="mx-auto max-w-xs">
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to and understand Boolitz
                  <Link
                    href="/privacy"
                    className="border-b border-gray-500 border-dotted mx-1"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="w-full bg-contain bg-center bg-no-repeat">
            <Image
              className="w-full h-full object-cover"
              src="/images/newspaper.jpeg"
              alt="Login"
              width={800}
              height={800}
              quality={70}
              placeholder="blur"
              blurDataURL="/images/newspaper-blur.jpeg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
