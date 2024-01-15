import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

type Props = {
  sidebarOpen: boolean | undefined;
  setSidebarOpen: (value: boolean) => void;
  setContent: (value: any) => void;
  selectedArticle: string;
};

interface ArticleContent {
  title: string;
  content: {
    summary: string[];
    takeaways: string[];
    main_idea?: string;
  };
  image: string;
  link: string;
  author?: string;
  key?: number;
}

const articleContent: ArticleContent[] = [
  {
    title: "Moore's Law for Everything",
    content: {
      summary: [
        "The author argues that as AI revolutionizes the economy, society needs to adapt its policies to ensure fair distribution of wealth and opportunities.",
        "New technologies will lead to a drastic economic transformation requiring significant policy changes.",
        "AI-powered automation will reduce production costs, making goods and services more accessible.",
        "The author proposes taxing assets like companies and land to fund a universal wealth distribution program.",
        "This approach aims to create a more equitable society where technological advancements benefit everyone.",
      ],
      takeaways: [
        "The author emphasizes the importance of a forward-looking approach rather than relying on outdated principles.",
        "The AI revolution will have a profound impact on the economy and society, requiring a new social contract.",
        "The focus should be on creating wealth through technological advancements and ensuring its equitable distribution.",
        "Taxing capital assets can help fund universal wealth distribution and reduce inequality.",
        "The goal is to foster a society where everyone can benefit from economic growth and technological progress.",
      ],
      main_idea:
        "The author envisions a future where AI drives economic growth and advocates for policies that distribute this wealth fairly, creating a more equitable and prosperous society.",
    },
    image: "/images/moores-law.png",
    link: "https://moores.samaltman.com/",
    author: "Sam Altman",
  },
  {
    title: "The AI Revolution: The Road to Superintelligence",
    content: {
      summary: [
        "The article states that technology is progressing at an exponential rate, and we are on the verge of a major change comparable to the rise of human life on Earth.",
        "The progress of the entire 20th century may be achieved in only 20 years at the rate of advancement in the year 2000.",
        "The world in 2050 might be so vastly different than today's world that we would barely recognize it.",
        "Artificial Intelligence (AI) is a broad concept that encompasses everything from your phone's calculator to self-driving cars.",
        "There are three major AI caliber categories: Artificial Narrow Intelligence (ANI), Artificial General Intelligence (AGI), and Artificial Superintelligence (ASI).",
        "AGI, sometimes referred to as Strong AI or Human-Level AI, refers to a computer that is as smart as a human across the board.",
        'ASI is the reason the topic of AI is so controversial and why the words "immortality" and "extinction" will both appear in these posts multiple times.',
        "Moore's Law suggests that the world's maximum computing power doubles approximately every two years, meaning computer hardware advancement grows exponentially.",
        "AGI could creep up on us quickly and unexpectedly due to exponential growth and the potential for sudden breakthroughs in software.",
        "Once AGI is achieved, it is likely to quickly surpass human intelligence, leading to an Intelligence Explosion and the creation of Artificial Superintelligence (ASI).",
      ],
      takeaways: [
        "The advancement of technology is happening at an unprecedented rate, and the world we live in could be drastically different in the coming decades.",
        "Artificial Intelligence is a rapidly developing field with the potential to revolutionize many aspects of our lives.",
        "The creation of Artificial General Intelligence (AGI) and Artificial Superintelligence (ASI) could have profound implications for humanity, both positive and negative.",
        "It is important to consider the ethical and societal implications of AI and to ensure that it is developed and used in a responsible manner.",
      ],
      main_idea:
        "Technological progress is accelerating at an exponential rate, and the advent of Artificial Intelligence, particularly Artificial General Intelligence (AGI) and Artificial Superintelligence (ASI), could have a profound impact on humanity.",
    },
    image: "/images/ai-revolution.png",
    link: "https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html",
    author: "Tim Urban",
  },
  {
    title: "How Did Companies Use Generative AI in 2023",
    content: {
      summary: [
        "Generative AI is expected to grow rapidly, with spending on solutions estimated to reach $151.1 billion by 2027.",
        "Many businesses are testing generative AI but are cautious about moving beyond experimentation due to cost, specialized talent requirements, and legal and privacy risks.",
        "Companies such as Wayfair, Schneider Electric, Mass General Brigham, Expedia, and Bentley Systems are exploring and implementing generative AI in various ways, including interior design, energy management, healthcare diagnostics, travel recommendations, and infrastructure design.",
        "Wayfair uses generative AI to help customers redesign their living rooms and improve employee productivity.",
        "Schneider Electric chooses smaller AI models that consume less energy to power its internal chatbot and help customers analyze carbon emissions.",
        "Mass General Brigham applies generative AI to identify patients with similar profiles to improve diagnostic insights and personalized care.",
        "Expedia uses generative AI as an assistant to enhance the travel booking experience and automate processes like customer-service-call summaries.",
        "Bentley Systems develops generative AI tools for creating construction drawings and proposing climate-resilient infrastructure designs.",
      ],
      takeaways: [
        "Generative AI has the potential to transform enterprise technology and reshape the way white-collar work is done, but its high cost and challenges hinder its full realization.",
        "Companies are exploring various use cases for generative AI, demonstrating its versatility and potential impact across industries.",
        "The integration of generative AI with existing technologies and data sources can yield significant benefits, such as improved productivity, enhanced decision-making, and personalized customer experiences.",
        "Ethical, legal, and privacy considerations must be taken into account as generative AI continues to advance and become more widely adopted.",
        "Collaboration between businesses, researchers, and policymakers is crucial to address the challenges and unlock the full potential of generative AI.",
      ],
      main_idea:
        "Generative AI is gaining traction in various industries, but cost, talent requirements, and risks pose challenges. Companies are exploring use cases and finding success in integrating generative AI with existing technologies and data sources.",
    },
    image: "/images/ai-2023.png",
    link: "https://www.wsj.com/articles/how-did-companies-use-generative-ai-in-2023-heres-a-look-at-five-early-adopters-6e09c6b3?mod=ai_news_article_pos4",
    author: "Belle Lin",
  },
  {
    title: "Could AI transform science itself",
    content: {
      summary: [
        "Previous scientific revolutions were sparked by academic journals, laboratories, and AI might be the catalyst for the next one.",
        "An approach called literature-based discovery (LBD) seeks new knowledge from scientific literature.",
        "LBD systems can predict discoveries and identify collaborators, bridging complementary research areas.",
        "Robot scientists can perform experiments, analyze results, and even enlarge the hypothesis space.",
        "Automation can help address the reproducibility crisis by verifying results and publishing negative findings.",
        "Obstacles to widespread AI adoption in science include hardware, software limitations, lack of interoperability, and scientists' unfamiliarity with AI tools.",
      ],
      takeaways: [
        "AI's ability to process information and generate new hypotheses could accelerate scientific discovery and transform the way research is conducted.",
        "Robot scientists could alleviate the burden of repetitive tasks, allowing human researchers to focus on more complex problems.",
        "LBD systems can enhance research by suggesting novel connections between concepts and identifying potential research partners.",
        "AI's impact on science may be comparable to the transformative effects of scientific journals and research laboratories.",
        "Adopting AI in science requires overcoming technical and cultural barriers to fully realize its potential.",
      ],
      main_idea:
        "AI has the potential to revolutionize scientific research by automating tasks, enhancing discovery processes, and fostering cross-disciplinary collaborations.",
    },
    image: "/images/ai-science.png",
    link: "https://www.economist.com/science-and-technology/2023/09/13/could-ai-transform-science-itself",
    author: "The Economist",
  },
  {
    title: "Generative AI’s iPhone Moment",
    content: {
      summary: [
        "Google finally releases Gemini 1.0, its latest advanced generative AI model.",
        "Gemini has three versions: Nano, Pro, and Ultra, with varying complexity levels.",
        "Gemini can outperform OpenAI's GPT-4 on most metrics but offers iterative advances rather than groundbreaking changes.",
        "Generative AI is entering its corporate phase, with tech giants like Google, Meta, Amazon, and Apple investing heavily.",
        "Big Tech companies aim to leverage generative AI to enhance their products, increase engagement, and generate more revenue.",
        "AI models are becoming integrated into broader ecosystems, such as Bard's integration with Gmail, Drive, and YouTube.",
        "The profit motive may lead to increased secrecy and limited transparency regarding AI's safety evaluations and potential risks.",
        "The success of generative AI may depend on tech companies effectively executing their long-standing strategies in the industry.",
      ],
      takeaways: [
        "The release of Gemini marks the transition of generative AI into a more commercial and corporate phase.",
        "The competition among tech giants to dominate the generative AI space is intensifying, leading to similar product offerings and features.",
        "Generative AI models are becoming seamlessly integrated into existing product suites, creating interconnected ecosystems.",
        "Despite advancements, the fundamental experience of interacting with generative AI remains largely unchanged, with incremental improvements rather than revolutionary transformations.",
        "The pursuit of profit may drive tech companies to adopt more secretive practices, limiting public knowledge about AI's safety evaluations and potential risks.",
        "The success of generative AI in driving societal transformation or serving as a new profit model will depend on the effectiveness of tech companies' strategies.",
      ],
      main_idea:
        "Google's Gemini generative AI model marks the transition of the technology into a corporate phase, with tech giants competing for dominance and integrating AI into their ecosystems.",
    },
    image: "/images/ai-iphone.png",
    link: "https://www.theatlantic.com/technology/archive/2023/12/google-gemini-ai-tech/676257/",
    author: "Matteo Wong",
  },
  {
    title: "The 3 Most Important AI Innovations of 2023",
    content: {
      summary: [
        "2023 was a groundbreaking year in the field of AI, with multimodal systems, constitutional AI, and text-to-video tools emerging as key innovations.",
        "Chatbots became viral, prompting governments to address AI risks.",
        "Multimodal AI models processed text, images, video, and audio data, leading to practical applications like describing recipe ideas based on images or identifying objects through drawings.",
        "Google's Gemini model showcases multimodal capabilities by recognizing objects and generating images from text descriptions.",
        "Multimodality enables models to harness abundant data sources, potentially leading to more capable and powerful AI.",
        "Constitutional AI aims to align AI with human values by training them on a set of rules and incentivizing adherence to those principles.",
        "OpenAI's ChatGPT uses reinforcement learning with human feedback to promote helpful, harmless, and compliant behavior, but scalability remains a challenge.",
        "Anthropic's Constitutional AI allows for democratic participation in shaping AI values and governs AI behavior through AI feedback.",
        "Text-to-video tools enable anyone to generate moving images from text descriptions, potentially revolutionizing filmmaking and user-generated content.",
        "Companies like Runway and Pika AI are leading the development of accessible text-to-video tools, aiming to democratize video creation.",
      ],
      takeaways: [
        "Multimodal AI has the potential to revolutionize various industries by extracting insights from diverse data types.",
        "AI companies are actively addressing concerns about AI alignment with human values through innovative approaches like Constitutional AI.",
        "The rise of accessible text-to-video tools could reshape creative industries by empowering individuals without specialized filmmaking skills.",
        "Collaboration between AI researchers and experts from various fields is crucial for responsible development and governance of AI.",
        "AI's increasing capabilities raise ethical and societal questions that require careful consideration and regulation.",
      ],
      main_idea:
        "2023 saw significant advancements in AI, including multimodal models, attempts to align AI with human values, and the democratization of video creation through text-to-video tools.",
    },
    image: "/images/ai-innovations.png",
    link: "https://time.com/6547982/3-big-ai-innovations-from-2023/",
    author: "Billy Perrigo",
  },
  {
    title: "The Best Resources on Artificial Intelligence",
    content: {
      summary: [
        "Artificial Intelligence (AI) will have profound impact across diverse domains like physics, law and retail.",
        "Ximilar has curated a list of resources including podcasts, books, magazines, videos and online courses to help you understand and stay updated on AI advancements.",
        "Popular podcasts include 'Lex Fridman' and 'Brain Inspired' covering topics like AI, neuroscience, and the future of humanity.",
        "'Life 3.0' by Max Tegmark explores how AI will transform various aspects of life including healthcare, jobs, justice, and war.",
        "MIT Technology Review offers insights into latest technology trends, including AI and its applications in fields like biotechnology and climate change.",
        "Andrej Karpathy's talks provide a glimpse into how Tesla is developing its autopilot system.",
        "Online courses and lectures from Andrew Ng, Udacity, and Stanford offer structured learning opportunities in AI and deep learning.",
        "Research blogs from Facebook, Google, Google Deepmind, Open AI, Baidu, NVIDIA, and others showcase cutting-edge research and developments in AI.",
        "Ethical and societal implications of AI are significant and include issues like job displacement, transparency, and the use of AI in warfare.",
        "Future advancements in AI include the development of self-supervised learning models that can learn from unlabeled data.",
      ],
      takeaways: [
        "To stay informed about AI advancements, explore the curated resources such as podcasts, books, videos, and online courses.",
        "Podcasts like 'Lex Fridman' offer thought-provoking discussions on AI, science, and the future of humanity.",
        "The book 'Life 3.0' by Max Tegmark provides valuable insights into the potential impacts of AI on various aspects of society.",
        "MIT Technology Review offers a comprehensive view of technology trends, including AI and its applications in diverse fields.",
        "Research blogs from leading tech companies provide a glimpse into the cutting-edge research and developments in AI.",
        "Ethical and societal implications of AI require careful consideration and ongoing discussions.",
        "Future advancements in AI, such as self-supervised learning, have the potential to further revolutionize the field and address challenges related to data labeling.",
      ],
      main_idea:
        "The provided article presents a comprehensive list of resources and insights on Artificial Intelligence, covering podcasts, books, online courses, research blogs, and discussions on ethical and societal implications of AI.",
    },
    image: "/images/ai-resources.png",
    link: "https://medium.com/swlh/the-best-resources-on-artificial-intelligence-and-machine-learning-2231011488bf",
    author: "Michal Lukac",
  },
];

export default function ArticleCarousel({
  sidebarOpen,
  setSidebarOpen,
  setContent,
  selectedArticle,
}: Props) {
  const doubleContent = DoubleArticleList(articleContent);

  return (
    <div className="overflow-hidden">
      <div className="pb-16 pt-24 sm:pt-32 bg-gray-900 mt-12 relative px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="absolute -top-[22px] sm:-top-[44px] text-4xl sm:text-7xl font-bold tracking-tight mix-blend-difference">
            No Seriously.
            <span className="block font-normal sm:font-bold text-base sm:text-2xl mix-blend-difference sm:tracking-wider sm:pt-4">
              see how much faster you get to the point.
            </span>
          </h3>
        </div>

        {/* This is where the overflow is occuring */}
        {/* I want to limit this to just the width of the screen without clipping the inner elements (they scroll to the left) */}
        <div className="flex flex-row flex-nowrap article-container max-w-full ">
          {doubleContent.map((content) => (
            <ArticleWrapper
              key={content.key}
              content={content}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              setContent={setContent}
              selectedArticle={selectedArticle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const ArticleWrapper = ({
  content,
  sidebarOpen,
  setSidebarOpen,
  setContent,
  selectedArticle,
}: {
  content: ArticleContent;
  sidebarOpen: boolean | undefined;
  setSidebarOpen: (value: boolean) => void;
  setContent: (value: any) => void;
  selectedArticle: string;
}) => {
  const handleClick = () => {
    if (content.content.main_idea === selectedArticle) {
      setContent(content.content);
      setSidebarOpen(!sidebarOpen);
    } else {
      setContent(content.content);
      if (!sidebarOpen) setSidebarOpen(true);
    }
  };

  return (
    //set the background-image using inline css
    <div
      onClick={handleClick}
      className="w-64 h-96 bg-white flex-shrink-0 mr-8 shadow-lg shadow-gray-500 rounded-sm hover:scale-105 transition-transform relative flex flex-col justify-end group cursor-pointer"
    >
      <div
        style={{
          backgroundImage: `url(${content.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity z-[91]"
      ></div>
      {/* create a background image that covers the entire container */}
      <p className="text-gray-700 text-center bg-[rgba(17,24,39,.1)] z-[92] font-bold p-4 mx-4 rounded-sm group-hover:bg-gray-800 group-hover:text-white transition-all">
        {content.title}
      </p>
      <div className="h-16" />
      {/* Other content */}
      <div className="relative z-[93] w-full">
        <a
          href={content.link}
          target="_blank"
          className="text-blue-800 text-sm absolute right-4 bottom-2 z-[93] italic hidden group-hover:block"
        >
          source
        </a>
      </div>
    </div>
  );
};

const DoubleArticleList = (articles: ArticleContent[]) => {
  //create a new array with the same content twice but with unique keys for each element
  let doubleContent: ArticleContent[] = [];

  for (let i = 0; i < articles.length * 2; i++) {
    let index = i % articles.length;
    doubleContent.push({ ...articles[index], key: i });
  }

  return doubleContent;
};
