import { useState } from "react";

import Nav from "../components/NavBar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <Nav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="bg-gray-50 mt-20 pt-20 pb-20">
        <div className="px-4 mx-auto max-w-3xl text-gray-800">
          <h2 className="font-bold text-xl">Terms of Service for Boolitz</h2>
          <p className="text-sm font-md">Effective Date: January 18, 2024</p>
          <h3 className="mt-8 font-bold mb-2">Introduction</h3>
          <p className="my-2">
            Welcome to Boolitz! By using the service, you agree to these terms.
            These terms are designed to ensure a positive experience for
            everyone, so please read them carefully.
          </p>
          <h3 className="font-semibold mt-6 underline">1. Using Boolitz</h3>
          <ul>
            <li>
              <p>
                Account Creation: You need an account to use most features of
                Boolitz. Keep your password secure and inform me immediately of
                any breach.
              </p>
            </li>
            <br />
            <li>
              <p>
                Acceptable Use: Use Boolitz responsibly and legally. Do not
                misuse the services in any way that could harm others or disrupt
                their experience.
              </p>
            </li>
          </ul>
          <h3 className="font-semibold mt-6 underline">
            2. Content and Copyright
          </h3>
          <p>
            Your Content: You retain rights to the content you create, but you
            grant Boolitz a license to use it for the operation of the service.
            Please only share content you have the right to share.
          </p>
          <br />
          <p>
            Boolitz&apos;s Rights: I own the Boolitz platform and our content,
            including software, graphics, and trademarks. You may not use my
            materials without my permission.
          </p>
          <h3 className="font-semibold mt-6 underline">3. Termination</h3>
          <p>
            I may suspend or terminate your access to Boolitz if you violate
            these terms or harm the community. You can also delete your account
            at any time.
          </p>
          <h3 className="font-semibold mt-6 underline">4. Changes to Terms</h3>
          <p>
            I may update these terms. We&apos;ll inform you about any
            significant changes, either via email or through a notice on
            Boolitz.
          </p>
          <h3 className="font-semibold mt-6 underline">5. Contact Us</h3>
          <p>
            Have questions about these terms? Reach out me at ryan@boolitz.com.
            I&apos;m here to help.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
