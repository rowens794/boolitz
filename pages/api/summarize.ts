// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

import { summarizeArticle, connectIdeas } from "../../library/summarizeArticle";
import {
  saveArticle,
  findExistingArticle,
  getSimilarArticles,
} from "../../library/mongo";

type Data = {
  data: any;
};

const cors = Cors({
  methods: ["GET", "HEAD", "POST"], // Adjust the methods as needed
  origin: "*", // Adjust the origin according to your needs, '*' allows all origins
});

function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //get userid [temp for now]
  const userId = "23j2o3irj2o3irj23r";
  let startTimer = Date.now();

  // Run the middleware
  await runMiddleware(req, res, cors);

  //check if article has already been summarized for user
  let existingArticle = await findExistingArticle(req.body, userId);

  if (existingArticle) {
    //@ts-ignore
    // let searchString = existingArticle.response.main_idea;
    // //@ts-ignore
    // let articleUrl = existingArticle.article.url;
    // //get similar articles
    // let similarArticles = await getSimilarArticles(searchString, articleUrl);

    // //@ts-ignore
    // let connectedIdeas = await connectIdeas(existingArticle, similarArticles);

    console.log("done");

    res.status(200).json({ data: { ...existingArticle, relatedArticles: [] } });
    return;
  } else {
    //summarize article
    let summarizedArticle = await summarizeArticle(req.body);

    //create tagged article document
    const taggedSummarizedArticle = {
      ...summarizedArticle,
      article: req.body,
      userId: userId,
      completionTime: Date.now() - startTimer,
    };

    //save article to the database
    let dbResult: any = await saveArticle(taggedSummarizedArticle);

    console.log(taggedSummarizedArticle);

    // //get similar articles
    // //@ts-ignore
    // let searchString = taggedSummarizedArticle.response.main_idea;
    // //@ts-ignore
    // let articleUrl = taggedSummarizedArticle.article.url;
    // //get similar articles
    // let similarArticles = await getSimilarArticles(searchString, articleUrl);

    console.log("done");

    res.status(200).json({
      data: { ...dbResult, relatedArticles: [] },
    });
  }
}
