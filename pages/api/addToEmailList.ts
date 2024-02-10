// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
const { ObjectId } = require("mongodb");
import { authOptions } from "./auth/[...nextauth]";
const { dbconnect } = require("@/library/mongo");

type Data = {
  status: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //@ts-ignore
  const session = await getServerSession(req, res, authOptions);
  const db = await dbconnect();
  const body = JSON.parse(req.body);

  //add email address to email subs list in db
  if (session) {
    await db.db("CHROME-EXTENSION-NEWS").collection("emailsubs").insertOne({
      email: body.email,
      timeSubscribed: new Date(),
    });
  }

  res.status(200).json({ status: "success" });
}
