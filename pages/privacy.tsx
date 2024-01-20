import { useState } from "react";

import Nav from "../components/NavBar";
import Footer from "@/components/Footer";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <Nav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="bg-gray-50 mt-20 pt-20 pb-20">
        <div className="px-4 mx-auto max-w-3xl text-gray-800">
          <h2 className="font-bold text-xl">Privacy Policy for Boolitz</h2>
          <p className="text-sm font-md">Last Updated: January 18, 2024</p>
          <h3 className="mt-8 font-bold mb-2">Welcome to Boolitz!</h3>

          <p className=" my-2">
            Your privacy is paramount to me, and I&apos;m fully committed to
            protecting it with clarity and responsibility. This policy details
            the information I gather, my methods of using it, and the choices
            you have concerning your personal data.
          </p>
          <h3 className="font-semibold mt-6 underline">
            1. Information I Collect
          </h3>
          <ul>
            <li>
              <p>
                Email Addresses: When you sign up for Boolitz, I collect your
                email address. This is essential for creating your account,
                helping me establish you as a unique user and ensuring smooth
                communication.
              </p>
            </li>
            <br />

            <li>
              <p>
                Usage Statistics: I track how you use Boolitz, including the
                features you engage with and the frequency of your visits. This
                data helps me understand user behavior and improve my service.
              </p>
            </li>
          </ul>
          <h3 className="font-semibold mt-6 underline">
            2. How I Use Your Information
          </h3>
          <p>
            Service Provision and Enhancement: Your information is helpful for
            operating and improving Boolitz. I use your email to send you
            important updates and information about my service.
          </p>
          <br />
          <p>
            Marketing Communications: From time to time, I may use your email to
            send you news about new features, tips for using Boolitz, or special
            promotions. I aim to provide value in my communications and will
            avoid overwhelming you with emails. I will always include an
            unsubscribe link in my marketing emails so that you can force me to
            shut up if you want.
          </p>
          <h3 className="font-semibold mt-6 underline">
            3. Your Privacy Choices
          </h3>
          <p>
            Opt-Out of Marketing Emails: If you prefer not to receive marketing
            emails, you can opt-out at any time by clicking the unsubscribe link
            at the bottom of any marketing email.
          </p>
          <br />
          <p>
            Data Security: I take the security of your data seriously and employ
            industry-standard measures to protect it. However, please remember
            that no method of transmission over the Internet is 100% secure.
          </p>
          <h3 className="font-semibold mt-6 underline">
            4. Changes to This Policy
          </h3>
          <p>
            I may update this policy from time to time. If I make changes, I
            will notify you via email or through a prominent notice on my
            website.
          </p>
          <h3 className="font-semibold mt-6 underline">5. Contact Me</h3>
          <p>
            If you have any questions (or suggestions) about this privacy
            policy, please feel free to contact me at ryan@boolitz.com. I commit
            to reading your email and I&apos;ll do my best to respond.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
