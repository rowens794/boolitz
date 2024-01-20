import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/20/solid";

import Nav from "../components/NavBar";
import Footer from "@/components/Footer";

export default function Roadmap() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/getRoadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vote: null, issueID: null }),
      });

      const data = await res.json();

      setRoadmap(data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50">
      <Nav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="min-h-[calc(100vh-200px)] mt-20 px-8 max-w-5xl mx-auto">
        <div className="pt-20 pb-10">
          <h1 className="text-gray-800 text-2xl">Product Roadmap</h1>
          <p className="text-indigo-700 font-light">
            See where the extension is headed and vote on the features you want
            me to implement next.
          </p>
          <p className="text-gray-500 font-light text-sm italic">
            You must login to vote on features.
          </p>
        </div>
        <Table roadmap={roadmap} setRoadmap={setRoadmap} session={session} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const Table = ({
  roadmap,
  setRoadmap,
  session,
}: {
  roadmap: any;
  setRoadmap: any;
  session: any;
}) => {
  return (
    <ul role="list" className=" overflow-hidden flex gap-2 flex-col">
      {roadmap.map((item: any) => {
        return (
          <li
            key={item._id}
            className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-200 sm:px-6 bg-gray-100 border-gray-200 border"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-bold leading-6 text-indigo-700 max-w-56 sm:max-w-96">
                  <span className="absolute inset-x-0 -top-px bottom-0 " />
                  {item.shortDesc}
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {item.longDesc}
                </p>
              </div>
            </div>
            <VotesContainer
              issueID={item._id}
              userVote={item.userVote}
              voteCount={item.totalVoteCount}
              setRoadmap={setRoadmap}
              session={session}
            />
          </li>
        );
      })}
    </ul>
  );
};

const VotesContainer = ({
  issueID,
  userVote,
  voteCount,
  setRoadmap,
  session,
}: {
  issueID: string;
  userVote: boolean;
  voteCount: number;
  setRoadmap: any;
  session: any;
}) => {
  const onClick = async (vote: boolean) => {
    const res = await fetch("/api/getRoadmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote, issueID }),
    });

    const data = await res.json();

    setRoadmap(data);
  };

  //test if the userVote value is exactly equal to true
  const votedYes = userVote === true;
  const votedNo = userVote === false;

  return (
    <div className="flex gap-1 absolute top-4 right-4">
      {session ? (
        <button className="" onClick={() => onClick(true)}>
          {votedYes ? (
            <HandThumbUpIcon className="h-4 w-4 text-green-700" />
          ) : (
            <HandThumbUpIcon className="h-4 w-4 text-gray-400" />
          )}
        </button>
      ) : null}
      <p
        className={`text-gray-700 text-xs text-center ${
          session ? "w-7" : "w-14 text-xs"
        }`}
      >
        {session ? "" : "votes: "}
        {voteCount > 0 ? "+" : ""}
        {voteCount}
      </p>
      {session ? (
        <button className="" onClick={() => onClick(false)}>
          {votedNo ? (
            <HandThumbDownIcon className="h-4 w-4 text-red-400" />
          ) : (
            <HandThumbDownIcon className="h-4 w-4 text-gray-400" />
          )}
        </button>
      ) : null}
    </div>
  );
};
