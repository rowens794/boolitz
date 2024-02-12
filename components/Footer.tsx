import React from "react";
import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
  const navigation = [];

  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/privacy" className="text-gray-500 text-xs">
            Privacy Policy
          </Link>
          <Link href="/tos" className="text-gray-500 text-xs">
            Terms of Service
          </Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd5MqO7-REQ-zXFgCkr8ka8aisDYZDlsuLhn_b4seOyOIUiLg/viewform?usp=sf_link"
            className="text-gray-500 text-xs"
          >
            Feedback
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2024 Boolitz All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
