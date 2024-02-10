// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
const { ObjectId } = require("mongodb");
import { authOptions } from "./auth/[...nextauth]";
const { dbconnect } = require("@/library/mongo");

type Data = {
  apiKey: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //@ts-ignore
  const session = await getServerSession(req, res, authOptions);
  const db = await dbconnect();

  if (session) {
    //check if the user has an api key
    let apiKey = await db
      .db("CHROME-EXTENSION-NEWS")
      .collection("apikeys")
      .findOne({
        email: session?.user?.email,
      });

    if (!apiKey) {
      //create a random 32 character string
      const randomString = generateRandomString();

      //create a new api key
      apiKey = await db
        .db("CHROME-EXTENSION-NEWS")
        .collection("apikeys")
        .insertOne({
          email: session?.user?.email,
          apiKey: randomString,
        });
    }

    res.status(200).json({ apiKey: apiKey.apiKey });
  } else {
    res.status(401).json({ apiKey: null });
  }
}

function generateRandomString(length: number = 32): string {
  // Characters that can be included in the string
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
