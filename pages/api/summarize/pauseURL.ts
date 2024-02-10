// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { dbconnect } = require("@/library/mongo");

type Data = {
  status: string;
  isPaused: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust the origin according to your needs
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Handle preflight requests for CORS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  //get the url from body
  const apiKey = req.body.apiKey;

  const type = req.body.type; // can be "url" or "domain"
  const requestedUrl = req.body.url;
  const requestedDomain = new URL(requestedUrl).hostname;
  const userId = await getUserFromApiKey(apiKey);

  const target = type === "url" ? requestedUrl : requestedDomain;

  let isPaused = await pauseUnpausePage(target, userId, type);

  res.status(200).json({
    status: "success",
    isPaused: isPaused,
  });
}

const pauseUnpausePage = async (
  url: string,
  userId: string,
  type: string
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const db = await dbconnect();
    //look for a document in the PausedPages collection with the provided url
    const pausedPage = await db
      .db("CHROME-EXTENSION-NEWS")
      .collection("pausedpages")
      .findOne({
        userId: userId,
        url: url,
        type: type,
      });

    //remove the record if it exists
    if (pausedPage) {
      await db.db("CHROME-EXTENSION-NEWS").collection("pausedpages").deleteOne({
        userId: userId,
        url: url,
        type: type,
      });

      resolve(false);
    }

    //if the record does not exist, add it
    if (!pausedPage) {
      await db.db("CHROME-EXTENSION-NEWS").collection("pausedpages").insertOne({
        userId: userId,
        url: url,
        type: type,
      });

      resolve(true);
    }
  });
};

const getUserFromApiKey = async (apiKey: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    resolve("rowens794@gmail.com");
  });
};
