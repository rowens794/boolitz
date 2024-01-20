// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
const { ObjectId } = require("mongodb");
import { authOptions } from "./auth/[...nextauth]";
const { dbconnect } = require("@/library/mongo");

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // get session from next-auth
  //@ts-ignore
  const session = await getServerSession(req, res, authOptions);
  const db = await dbconnect();

  //get request body
  const { vote, issueID } = req.body;

  //update the user vote in the database
  if (vote !== null && issueID !== null && session?.user?.email) {
    // Convert issueID to ObjectId
    const issueObjectId = new ObjectId(issueID);

    // Check if a uservote document exists for this user and issue
    const userVote = await db
      .db("CHROME-EXTENSION-NEWS")
      .collection("uservotes")
      .findOne({
        email: session?.user?.email,
        issueId: issueObjectId,
      });

    // If userVote exists and the new vote is the same as the old vote, delete the userVote
    if (userVote && userVote.vote === vote) {
      await db.db("CHROME-EXTENSION-NEWS").collection("uservotes").deleteOne({
        email: session?.user?.email,
        issueId: issueObjectId,
      });
    } else {
      // If userVote exists and the new vote is different from the old vote, update the userVote
      if (userVote) {
        await db
          .db("CHROME-EXTENSION-NEWS")
          .collection("uservotes")
          .updateOne(
            {
              email: session?.user?.email,
              issueId: issueObjectId,
            },
            {
              $set: {
                vote: vote,
              },
            }
          );
      } else {
        // If userVote does not exist, create a new userVote
        await db.db("CHROME-EXTENSION-NEWS").collection("uservotes").insertOne({
          email: session?.user?.email,
          issueId: issueObjectId,
          vote: vote,
        });
      }
    }
  }

  //get all roadmap items from the database along with vote counts from the userVotes collection and the user's vote
  const roadmapItemsWithVotes = await db
    .db("CHROME-EXTENSION-NEWS")
    .collection("roadmap")
    .aggregate([
      {
        $lookup: {
          from: "uservotes",
          localField: "_id",
          foreignField: "issueId",
          as: "votes",
        },
      },
      {
        $unwind: {
          path: "$votes",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          shortDesc: { $first: "$shortDesc" },
          longDesc: { $first: "$longDesc" },
          status: { $first: "$status" },
          totalVoteCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $ne: ["$votes", null] },
                    { $eq: ["$votes.issueId", "$_id"] },
                  ],
                },
                {
                  $cond: [{ $eq: ["$votes.vote", true] }, 1, -1],
                },
                0,
              ],
            },
          },
          userVote: {
            $max: {
              $cond: [
                { $eq: ["$votes.email", "rowens794@gmail.com"] }, // Replace with the user's email
                "$votes.vote",
                null,
              ],
            },
          },
        },
      },
      {
        $sort: {
          totalVoteCount: -1,
          _id: 1,
        },
      },
    ])
    .toArray();

  res.status(200).json(roadmapItemsWithVotes);
}
