import { GoogleGenerativeAI } from "@google/generative-ai";

const { MongoClient, ServerApiVersion } = require("mongodb");

// Singleton MongoClient instance
let client: any;

async function dbconnect() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_CONNECT_STRING, {
      serverApi: { version: ServerApiVersion.v1 },
    });

    try {
      await client.connect();
      console.log("Successfully connected to MongoDB!");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error; // Rethrow to allow caller to handle the error
    }
  }

  return client;
}

module.exports = { dbconnect };

// export async function saveArticle(article: any) {
//   return new Promise(async (resolve, reject) => {
//     let dbClient = await dbconnect();

//     //save the article and return the saved document
//     //@ts-ignore
//     const result = await dbClient
//       .db("CHROME-EXTENSION-NEWS")
//       .collection("articles")
//       .insertOne(article);

//     //create a new document with the objectID inserted
//     const newArticle = {
//       ...article,
//       _id: result.insertedId,
//     };

//     resolve(newArticle);
//   });
// }

// export async function findExistingArticle(article: any, userid: string) {
//   return new Promise(async (resolve, reject) => {
//     let dbClient = await dbconnect();

//     //@ts-ignore
//     const result = await dbClient
//       .db("CHROME-EXTENSION-NEWS")
//       .collection("articles")
//       .findOne({
//         userId: userid,
//         "article.url": article.url,
//       });

//     resolve(result);
//   });
// }

// export async function getSimilarArticles(
//   searchString: string,
//   articleUrl: string
// ) {
//   return new Promise(async (resolve, reject) => {
//     //get search string embedding
//     const searchStringEmbedding = await getEmbedding(searchString);

//     let dbClient = await dbconnect();

//     //@ts-ignore
//     const result = await dbClient
//       .db("CHROME-EXTENSION-NEWS")
//       .collection("articles")
//       .aggregate([
//         {
//           $vectorSearch: {
//             queryVector: searchStringEmbedding,
//             path: "embedding",
//             numCandidates: 100,
//             index: "vector_index",
//             limit: 10,
//           },
//         },
//         { $match: { "article.url": { $ne: articleUrl } } },
//         {
//           $project: {
//             _id: 0,
//             title: "$article.title",
//             score: { $meta: "vectorSearchScore" },
//             url: "$article.url",
//             textContent: "$article.textContent",
//           },
//         },
//       ])
//       .toArray();

//     resolve(result);
//   });
// }

// const getEmbedding = async (text: string): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     const genAI = new GoogleGenerativeAI(
//       process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY : ""
//     );

//     const model = genAI.getGenerativeModel({ model: "embedding-001" });

//     const result = await model.embedContent(text);
//     const embedding = result.embedding;
//     resolve(embedding.values);
//   });
// };
