import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Example({ apiKey }: any) {
  const { data: session } = useSession();

  return (
    <div className=" h-[calc(100vh-160px)] ">
      {apiKey && (
        <input
          type="hidden"
          id="bapik"
          value={apiKey}
          readOnly
          className="hidden"
        />
      )}
      {session ? <SuccessScreen /> : <LoginScreen />}
    </div>
  );
}

const LoginScreen = () => {
  return (
    <main className="mx-auto max-w-96 flex flex-col gap-20 my-24 bg-gray-50">
      <div>
        <h1 className="text-center font-bold text-indigo-950 text-2xl">
          Login to Boolitz!
        </h1>
        <Image
          className="h-24 w-24 mx-auto"
          src="/images/logo-120.png"
          alt=""
          width={120}
          height={120}
        />
      </div>{" "}
      <button
        type="button"
        className="text-sm font-semibold leading-6 max-w-72 w-full border bg-indigo-100 mx-auto py-2 rounded-sm border-indigo-200 text-indigo-700 hover:bg-indigo-200"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </main>
  );
};

const SuccessScreen = () => {
  return (
    <main className="mx-auto max-w-96 flex flex-col gap-20 my-24 bg-gray-50">
      <div>
        <h1 className="text-center font-bold text-indigo-950 text-2xl">
          You&apos;re Extension is Authenticated!
        </h1>
        <Image
          className="h-24 w-24 mx-auto"
          src="/images/logo-120.png"
          alt=""
          width={120}
          height={120}
        />
      </div>
      <div className="w-full text-center">
        <Link href="/">
          <button
            type="button"
            className="text-sm font-semibold leading-6 max-w-72 w-full border bg-indigo-100 py-2 rounded-sm border-indigo-200 text-indigo-700 hover:bg-indigo-200"
          >
            Back Home
          </button>
        </Link>
      </div>
    </main>
  );
};

//get server side props
export async function getServerSideProps(context: any) {
  // Extract cookies from context
  const { req } = context;
  const cookies = req.headers.cookie;

  //make api call to /api/getUserApiKey
  const res = await fetch("http://localhost:3000/api/getUserApiKey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies || "",
    },
    body: JSON.stringify({}),
  });

  const data = await res.json();

  return {
    props: {
      apiKey: data.apiKey || null,
    },
  };
}
