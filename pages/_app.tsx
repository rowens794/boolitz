import { SessionProvider, useSession } from "next-auth/react";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Auth({ children }: { children: any }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
