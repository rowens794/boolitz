import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

interface Article {
  /** article title */
  title: string;

  /** HTML string of processed article content */
  content: string;

  /** text content of the article, with all the HTML tags removed */
  textContent: string;

  /** length of an article, in characters */
  length: number;

  /** article description, or short excerpt from the content */
  excerpt: string;

  /** author metadata */
  byline: string;

  /** content direction */
  dir: string;

  /** name of the site */
  siteName: string;

  /** content language */
  lang: string;

  /** published time */
  publishedTime: string;

  url: string;

  readTime: string;
}

export const summarizeArticle = async (
  article: Article
): Promise<{
  response: string;
  tokenCounts: {
    inputTokenCounts: number;
    outputTokenCounts: number;
  };
  embedding: any;
}> => {
  return new Promise(async (resolve, reject) => {
    const prompt = generatePrompt(article);
    let response = await getGeneratedSummary(prompt);
    let jsonifiedResponse = correctJsonInResponse(response);

    //get token counts
    let [tokenCountsPromise, embeddingPromise] = await Promise.all([
      getTokenCounts(prompt, response),
      getEmbedding(article.textContent),
    ]);

    const tokenCounts = await tokenCountsPromise;
    const embedding = await embeddingPromise;

    resolve({
      response: jsonifiedResponse,
      tokenCounts,
      embedding,
    });
  });
};

const getGeneratedSummary = async (prompt: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY : ""
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    const parts = [{ text: prompt }];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    resolve(response.text());
  });
};

const generatePrompt = (article: Article): string => {
  let prompt = `
    You are an expert economic analyst and researcher.  Your clients provide you with news articles for analysis.  Your job is the following:
      1. create summaries of the articles in bullet point format.  
      2. provide deeper analysis, your clients usually refer to these as take-aways.  In these take-aways, you are expected to read between the lines of the story and provide unique insights into what the deeper implications of the story might be.  Again, your take-aways should be in bullet point format.
      3. Your clients are very busy and they want to sound informed when speaking to their stakeholders.  The also want a 1 line summary of each story so that if someone asks them about the story, they can quickly respond with a high-level summary. They refer to this is the main idea.

    It is very important that you remember that your response needs to be in JSON format, with the following structure: 

        {
            summary: Array of Strings, 
            takeaways: Array of Strings, 
            main_idea: String
        }

    If you do not follow this format, your response will not be accepted.  Do not add any extraneous text to your response - there should be no extra quotes at the beginning or end of your response and there should be no labeling of the response as JSON.  Begin your response with a { and end your response with }

    Also, it's important to remember that they story content is usually just a raw text dump from a webpage.  The text might be very messy and include elements that are not actually part of the story, like photo captions, advertisements, etc., you can safely ignore these elements.

    Here is the text of the artile: ${article.textContent}

    AI Response: {
    `;

  return prompt;
};

export const getEmbedding = async (text: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY : ""
    );

    const model = genAI.getGenerativeModel({ model: "embedding-001" });

    const result = await model.embedContent(text);
    const embedding = result.embedding;
    resolve(embedding.values);
  });
};

const getTokenCounts = async (
  inputString: string,
  outputString: string
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY : ""
    );

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    //get input tokens
    const inputTokenResult = await model.countTokens(inputString);
    const inputTokenCounts = inputTokenResult.totalTokens;

    //get output tokens
    const outputTokenResult = await model.countTokens(outputString);
    const outputTokenCounts = outputTokenResult.totalTokens;

    resolve({
      inputTokenCounts: inputTokenCounts,
      outputTokenCounts: outputTokenCounts,
    });
  });
};

const correctJsonInResponse = (response: any): any => {
  let json = `{ ${response}`;
  let correctedJson = JSON.parse(json);
  return correctedJson;
};

export const connectIdeas = async (
  article: Article,
  relatedArticles: Article[]
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    let prompt = createConnectIdeasPrompt(article, relatedArticles);
  });
};

export const createConnectIdeasPrompt = async (
  article: Article,
  relatedArticles: Article[]
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    let prompt = `I need you to identify and connect similar ideas from a few articles to help a reader connect ideas across sources.  The reader is highly interested in economic arguments, so if you can connect economic ideas then that is all the better.

        Here is the text of the original article: ${article.textContent}

        here is the text of the related articles:`;

    relatedArticles.forEach((article, i) => {
      prompt += `
        Article ${i + 1}: 
        Article Title: ${article.title}
        Article URL: ${article.url}
        Article Text: ${article.textContent}

      `;
    });

    prompt += `Your output should be in valid json format.  It should contain an array ideas that are structured as follows:

    {
        ideas: [{
            idea: one sentence explaining the connected idea,
            url: url of source article,
            title: title of source article
        },...]
    }`;

    prompt += `AI Response: {`;

    resolve(prompt);
  });
};
