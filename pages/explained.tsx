import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import Nav from "../components/NavBar";
import Footer from "@/components/Footer";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("getting-started");

  //check if the url has a hash and set the active section accordingly
  useEffect(() => {
    if (window.location.hash) {
      setActiveSection(window.location.hash.substring(1));
    }
  }, []);

  return (
    <div className="bg-gray-50">
      <Nav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main>
        <Application
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const Application = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (value: string) => void;
}) => {
  return (
    <div className="w-full max-w-5xl pt-28 mx-auto h-full min-h-[calc(100vh-116px)] flex gap-12 px-4">
      <div className="w-64 h-full flex-shrink-0 hidden md:block">
        {sections.map((section) => (
          <Sections
            key={section.name}
            elem={section}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        ))}
      </div>

      <div className=" flex-grow-0 overflow-hidden overflow-y-scroll pb-24 pr-8">
        <h2 className="text-xl font-bold text-indigo-800 my-4">
          {sectionContent[activeSection].title}
        </h2>
        <div>
          {sectionContent[activeSection].content.map((content, index) => {
            return (
              <p key={index} className="font-light text-indigo-900 my-4">
                {parseContentWithLinksAndImages(content)}
              </p>
            );
          })}
          <BottomNav
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
      </div>
    </div>
  );
};

const parseContentWithLinksAndImages = (content: string) => {
  // Regular expression to match both custom link and image formats
  const patternRegex = /###text=(.*?) url=(.*?)###|##src='(.*?)'##/g;
  // Split the content based on the regex, including the regex match in the result
  const parts = content.split(patternRegex);

  return parts
    .map((part, index) => {
      if (index % 4 === 1 && part) {
        // This is the text for a link
        const text = part;
        // The URL for the link, which is the next element in the array
        const url = parts[index + 1];
        return (
          <a
            key={`link-${index}`}
            href={url}
            className="text-indigo-600 hover:underline font-semibold"
          >
            {text}
          </a>
        );
      } else if (index % 4 === 3 && part) {
        // This is the src for an image
        const src = part;
        return (
          <img
            key={`img-${index}`}
            src={src}
            className="my-8 mx-auto max-w-[450px] rounded-md shadow-xl"
            alt=""
          />
        );
      } else if (index % 4 === 0) {
        // This is a text part
        return part;
      }
      // Filter out the URL and empty parts since they are already processed
      return null;
    })
    .filter((part) => part !== null); // Remove null elements resulting from filtering
};

const BottomNav = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: any;
}) => {
  const sectionKeys = Object.keys(sectionContent);
  const currentIndex = sectionKeys.indexOf(activeSection);
  const nextIndex = currentIndex + 1;
  const prevIndex = currentIndex - 1;
  const nextSection = sectionKeys[nextIndex];
  const prevSection = sectionKeys[prevIndex];
  const nextSectionTitle = sectionContent[nextSection]?.title;
  const prevSectionTitle = sectionContent[prevSection]?.title;

  const handleClick = (section: string) => {
    //scroll to top
    //scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    setActiveSection(section);
    window.location.hash = `#${section}`;
  };

  return (
    <div className="flex justify-between w-full max-w-5xl mx-auto sm:px-4 mt-8">
      {prevIndex >= 0 ? (
        <button
          onClick={() => handleClick(prevSection)}
          className="relative flex flex-row justify-start"
        >
          <div className="hidden sm:flex flex-col justify-center mx-2">
            <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div>
            <span className="text-gray-400 text-xs font-light block text-left">
              Previous
            </span>
            <span className="text-xs text-left sm:text-sm text-indigo-600 font-normal block">
              {prevSectionTitle}
            </span>
          </div>
        </button>
      ) : (
        <div></div>
      )}
      {nextIndex < sectionKeys.length ? (
        <button
          onClick={() => handleClick(nextSection)}
          className="relative flex flex-row justify-end"
        >
          <div>
            <span className="text-gray-400 text-xs font-light block text-right">
              Next
            </span>
            <span className="text-xs text-right sm:text-sm text-indigo-600 font-normal block">
              {nextSectionTitle}
            </span>
          </div>
          <div className="hidden sm:flex flex-col justify-center mx-2">
            <ArrowLeftIcon className="h-5 w-5 text-gray-400 transform rotate-180" />
          </div>
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const Sections = ({
  elem,
  activeSection,
  setActiveSection,
}: {
  elem: { name: string; children: any[] };
  activeSection: string;
  setActiveSection: (value: string) => void;
}) => {
  return (
    <li className="list-none mt-6">
      <SectionHeading name={elem.name} />
      {elem.children.map((child) => (
        <ul
          key={child.href}
          role="list"
          className={`mt-1 space-y-2 lg:mt-2 lg:space-y-4 pl-0.5 ${
            activeSection === child.href
              ? "border-l-2 border-indigo-300 lg:border-indigo-300"
              : "hover:border-l-2 hover:border-gray-200 hover:pl-0"
          }`}
        >
          <SectionItem
            name={child.name}
            href={child.href}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />{" "}
        </ul>
      ))}
    </li>
  );
};

const SectionHeading = ({ name }: { name: string }) => {
  return <h2 className="font-display font-bold text-indigo-900">{name}</h2>;
};

const SectionItem = ({
  name,
  href,
  activeSection,
  setActiveSection,
}: {
  name: string;
  href: string;
  activeSection: string;
  setActiveSection: (value: string) => void;
}) => {
  const handleClick = (section: string) => {
    //scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    window.location.hash = `/pause-urls#${section}`;

    setActiveSection(section);
  };
  return (
    <li className="relative" id={`${href}-link`}>
      <Link
        className={`block w-full pl-3.5 before:pointer-events-none before:absolute text-indigo-500 font-light ${
          activeSection === href && "font-normal"
        }`}
        href={`#${href}`}
        onClick={() => handleClick(href)}
      >
        {name}
      </Link>
    </li>
  );
};

const sections = [
  {
    name: "introduction",
    children: [
      { name: "getting started", href: "getting-started" },
      { name: "why gemini?", href: "why-gemini" },
      { name: "installation", href: "installation" },
    ],
  },
  {
    name: "usage",
    children: [
      { name: "how it works", href: "how-it-works" },
      { name: "disabling domains", href: "disabling-domains" },
      { name: "disabling urls", href: "disabling-urls" },
    ],
  },
  {
    name: "your data",
    children: [
      { name: "what data goes where?", href: "what-data-goes-where" },
      { name: "could this change?", href: "could-this-change" },
    ],
  },
];

const sectionContent: {
  [key: string]: {
    title: string;
    content: string[];
  };
} = {
  "getting-started": {
    title: "Getting Started",
    content: [
      "Welcome to Boolitz, the Chrome extension that transforms your reading experience by providing concise summaries of online articles using the power of Google's Gemini. Once installed, ###text=Boolitz url=https://www.boolitz.com### seamlessly integrates into your browsing, automatically generating bullet-point summaries for every article you visit on your desktop computer. Here’s how to get started on your journey to more efficient reading.",
      "First, after installing Boolitz from the Chrome Web Store, you’ll need to activate your Boolitz account. Simply log in to your account, or create one if you haven’t already. Next, you'll need to enter your Google Gemini API key. This key is essential for the summarization magic to happen, as it allows Boolitz to process and summarize the articles you read.",
      //   "##src='/images/logo.png'##",
      "No further customization is required. Boolitz is designed to work out of the box, providing you with instant summaries on the side of your article pages within 5-10 seconds. This ensures you spend less time reading and more time understanding.",
      "Boolitz is currently optimized for desktop use on Chrome browser only. I'm just one man and unfortunately I'm prioritizing other things.",
      "I'm working on developing support infrastructure, but there's none right now.  I encourage you to use the feature request tool available at ###text=Boolitz Roadmap url=https://www.boolitz.com/roadmap###. Your feedback helps.",
      "In terms of privacy and permissions, Boolitz requires the following permissions to operate effectively: 'activeTab' and 'storage'. These permissions allow Boolitz to generate summaries for the articles you visit while ensuring your data remains secure and private.",
      "I'm constantly developing and planning new features for Boolitz. Stay tuned for updates and enhancements that will make your reading experience even better. Be sure to check the roadmap and share your ideas for new features!",
    ],
  },
  "why-gemini": {
    title: "Why Gemini?",
    content: [
      "I picked Google's Gemini for Boolitz for a few solid reasons: it's super capable, lightning-fast, and, best of all, it’s practically free to use. Gemini's pretty awesome because it can hold its own against other big-name language models, ensuring you get spot-on summaries every time you use Boolitz.",
      "Speed matters a lot to me — and probably to you, too. Gemini nails this by whipping up summaries in no time, usually between 5-10 seconds. This means less waiting around and more reading the good stuff, making your browsing session smooth and snappy.",
      "Now, onto the best part: using Gemini with Boolitz won’t cost you a dime for most users. Thanks to Google’s generosity, you can make one API call per second for free. This is a game-changer because it lets you enjoy top-notch summaries without opening your wallet. Pretty cool, right?",
      "Getting Gemini to talk to Boolitz was a breeze, taking less than two minutes to set up. This quick integration meant I could spend more time making sure Boolitz runs like a dream for you.",
      "While I don’t expect new bells and whistles from Google's end, I’m not sitting still. I’m looking into adding other models to Boolitz to give you even more options down the line. Keep your eyes peeled for updates that'll make your Boolitz experience even better.",
      "Choosing Gemini was all about giving you a fast, efficient, and cost-friendly way to get to the heart of articles. With Boolitz powered by Gemini, you're all set for a smoother, smarter browsing journey. And hey, keeping it free for you to use? That’s the cherry on top.",
    ],
  },
  installation: {
    title: "Installation",
    content: [
      "Getting Boolitz onto your Chrome is easy, even if you've never installed a Chrome extension before. Here’s a quick rundown: Head over to the Chrome Web Store and search for 'Boolitz.' Hit that 'Add to Chrome' button, then click 'Add extension' in the popup that shows up. Voilà, you're all set with the installation part!",
      "Once Boolitz is snugly installed in your browser, you'll see a little popup asking you to sign in. There's a shiny button right there in the interface for you to hit and sign in with your Google account. Easy peasy, right?",
      "Next up, you'll see a prompt to enter your Google Gemini API key. Now, if you’re scratching your head wondering, 'What’s that?' don’t worry. You’ll need to hop over to Google Cloud, create a project if you haven’t already, and enable the Gemini API for that project. Google will then give you an API key — this is like a special password that lets Boolitz chat with Gemini. Copy that key, paste it into the prompt in Boolitz, and hit 'Submit.'",
      "And guess what? That’s pretty much it. No complicated settings or configurations needed. Once your API key is in, Boolitz kicks into gear and starts doing its thing on all web pages. You don’t need to do anything else; just watch those summaries pop up as you browse.",
      "If you hit any snags or have questions, I know I don’t have a fancy FAQ or support line set up yet (I’m working on it, promise!). But really, the process is so straightforward, I’m confident you’ll get through it without a hitch. And hey, I’m always making things better, so keep an eye out for updates and new features.",
    ],
  },
  "how-it-works": {
    title: "How It Works",
    content: [
      "Curious about the magic behind Boolitz? It’s all about making your life easier. Here’s the scoop: Once Boolitz is part of your Chrome family and you’re all set with your Google Gemini API key, the magic begins. You don’t need to lift a finger; Boolitz gets to work the moment you land on a webpage.",
      "Here’s what happens under the hood: Boolitz quickly figures out if the page you’re on is an article. If it’s a thumbs-up, it sends the article’s text over to Google Gemini to whip up a summary. In the blink of an eye (okay, more like 5-10 seconds), the summary is back from Gemini and pops up neatly on the side of the webpage. All the while, you’ll see a little loading indicator in the bottom right corner of the page, letting you know that Boolitz is cooking up something good.",
      "And the best part? You don’t need to do anything to see these summaries. It’s totally automatic. But hey, I know sometimes you might not want a summary for everything. That’s why I’ve slipped in a couple of handy options for you. On any page, you can tell Boolitz to 'ignore this URL' or even to 'ignore this domain.' If you ever change your mind, no sweat — reversing those decisions is just as easy.",
      "These options give you the power to tailor Boolitz’s summarizing skills exactly to your liking. Whether it’s dialing back on certain sites or focusing on the ones you really care about, you’re in control. And that’s it! Boolitz is here to save you time and give you the gist of articles without the hassle. Enjoy the simpler, smarter way to browse.",
    ],
  },
  "disabling-domains": {
    title: "Disabling Domains",
    content: [
      "Ever landed on a site where you just want to dive into the full content without a summary? I totally get that. That's why I made it super easy for you to tell Boolitz to chill out on certain domains. Whether you're shopping on Amazon or browsing another site where summaries just clutter the scene, you've got the control.",
      "You can ask Boolitz to skip a domain in two slick ways: hit the 'Disable Domain' button right from the extension popup next to your URL bar ##src='/images/pause-domain-popup.png'## or use the same button found on the summary panel. It's your call, making sure Boolitz only shows up where you want it.",
      "Changed your mind? No stress! Just click the 'Unpause Domain' button from the extension popup,##src='/images/unpause-domain-popup.png'##  and boom, summaries are back on for that domain. The cool part? These changes kick in straight away. The next time you visit a page from that domain, it's like nothing ever happened—Boolitz steps back into action.",
      "Wondering if your 'Disable Domain' command worked? Keep an eye on the button—it switches up to show you've made the change. It's a neat little confirmation that lets you know everything's set just the way you like it.",
      "Right now, I'm cooking up a feature that'll let you see and tweak your list of disabled domains. It's not ready yet, but stay tuned! It's going to make managing your preferences even smoother.",
      "A heads-up on which domains might be good to skip? Sure thing. Think about places where summaries might be more of a distraction than a help—like your favorite shopping sites. Boolitz is here to enhance your reading, not complicate it, so disabling those domains can keep your browsing neat and tidy.",
    ],
  },
  "disabling-urls": {
    title: "Disabling URLs",
    content: [
      "Got a specific page that doesn't need a summary? No worries, Boolitz has got you covered there too. Just like with domains, you can tell Boolitz to skip over individual URLs, making sure those summaries only pop up where they're most useful to you.",
      "Turning off summaries for a URL is a piece of cake. You can do it right from the summary panel or the extension popup, ##src='/images/pause-url.png'## just look for the 'Disable URL' button. Click it, and you're all set; Boolitz will remember to keep its hands off that page.",
      "If you ever find yourself missing Boolitz's insights on a page you've previously disabled, bringing it back is just as simple. Hit the 'Unpause URL' button available in the same spots you used to disable it. Changes take effect immediately, so summaries will be ready to greet you the next time you visit that URL.",
      "And yes, you'll know for sure that your command has been registered. The button changes to confirm your action, giving you a clear signal that Boolitz is now stepping aside for that URL.",
      "While managing a list of disabled URLs isn't an option just yet, it's on my radar for future updates. I'm always looking for ways to make your experience more customizable and straightforward.",
      "When to use this feature? It's all about your preference. Maybe there's an article you're deeply engaged with and prefer to read in full detail without interruption. That's a perfect time to use 'Disable URL.' Remember, Boolitz is here to suit your reading style, not dictate it.",
    ],
  },
  "what-data-goes-where": {
    title: "What Data Goes Where?",
    content: [
      "Let's talk privacy and data—because I know how much it matters to you. With Boolitz, I've kept things super straightforward and privacy-friendly. Here’s exactly what happens with your data:",
      "First off, Boolitz keeps track of just two things: how many pages you’ve summarized and any pages or domains you’ve decided to take a break from summarizing. And that’s it. I don’t peek at the content you’re reading or collect any personal details. The actual content of the pages you summarize? That goes directly from your browser to the Gemini API, without ever touching Boolitz servers. This means your reading stays between you, the page, and Google's LLM.",
      "As for the data that is collected (like your paused pages/domains and summary count), it's only used to make your Boolitz experience smoother. For example, remembering which domains you don’t want summarized helps keep things running just how you like them.",
      "And in case you’re wondering, I don’t share your data with anyone. It's just not necessary for how Boolitz works. Your browsing habits and choices are yours alone. I'm here to enhance your reading, not to share your story.",
      "Currently, there’s no need for user controls around data because, frankly, there’s not much data to control. But I'm all about giving you power over your experience, so if this changes or if there's more you want control over, I'm all ears. Your trust and safety are my top priorities.",
    ],
  },
  "could-this-change": {
    title: "Could This Change?",
    content: [
      "The digital landscape is always evolving, and so is Boolitz. I'm constantly thinking about how to make your experience better, which means changes and new features are always on the horizon. But here’s my pledge: if anything about how Boolitz operates or handles your data is going to change, I'll make sure you're in the know—via the website and email.",
      "Your voice matters a lot to me. I'm all ears when it comes to user feedback and am working on setting up more channels for you to share your thoughts and suggestions. These insights are invaluable as they guide the updates and new features I bring to Boolitz.",
      "In the near future, I plan to roll out features that might change the way Boolitz interacts with your data. For example, offering the option to save article content for later reminders or introducing an in-house LLM to streamline your experience. Yes, this means Boolitz will handle more data, but transparency is key. I promise to be upfront about these changes, ensuring you understand and are comfortable with them.",
      "Privacy matters to me, and any adjustments to the policy will be communicated clearly. Should new features require more from you in terms of data, you’ll hear all about the what, why, and how through email and on the website, giving you all the details you need to make informed choices.",
      "I understand that not every change will be for everyone. That’s why I'm committed to keeping you informed every step of the way, ensuring you remain in control of your experience with Boolitz. Stay tuned for what's coming, and remember, your feedback is what shapes the future of Boolitz.",
    ],
  },
};
