// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
const { dbconnect } = require("@/library/mongo");

type Data = {
  pageBlocked: boolean;
  urlBlocked: boolean;
  domainBlocked: boolean;
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

  const db = await dbconnect();

  //start logic
  let pageBlocked = false;
  let urlBlocked = false;
  let domainBlocked = false;

  //get blocked lists
  let blockedUrls: string[] = ["https://www.wsj.com/"];
  let blockedDomains: string[] = ["www.boolitz.com"];

  const requestedUrl = req.body.url;
  const requestedDomain = new URL(requestedUrl).hostname;
  const userId = await getUserFromApiKey(req.body.apiKey);

  //get an aggrations that creates an array of paused pages/urls from the db
  const pausedPages = await db
    .db("CHROME-EXTENSION-NEWS")
    .collection("pausedpages")
    .aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      //group the type url and domain into separate arrays
      {
        $group: {
          _id: "$type",
          urls: {
            $push: "$url",
          },
        },
      },
    ])
    .toArray();

  //create individual variables for the paused urls and domains
  const pausedUrls = pausedPages.find((page: any) => page._id === "url")?.urls;
  const pausedDomains = pausedPages.find(
    (page: any) => page._id === "domain"
  )?.urls;

  //add the paused urls and domains to the blocked lists
  blockedUrls = blockedUrls.concat(pausedUrls);
  blockedDomains = blockedDomains.concat(pausedDomains);

  if (blockedUrls.includes(requestedUrl)) urlBlocked = true;
  if (blockedDomains.includes(requestedDomain)) domainBlocked = true;
  if (urlBlocked || domainBlocked) pageBlocked = true;

  res.status(200).json({
    pageBlocked: pageBlocked,
    urlBlocked: urlBlocked,
    domainBlocked: domainBlocked,
  });
}

const getUserFromApiKey = async (apiKey: string): Promise<string | null> => {
  return new Promise(async (resolve, reject) => {
    const db = await dbconnect();

    //get the user from the api key in collection apikeys
    const user = await db
      .db("CHROME-EXTENSION-NEWS")
      .collection("apikeys")
      .findOne({
        apiKey: apiKey,
      });

    if (user) {
      resolve(user.email);
    } else {
      reject(null);
    }
  });
};
