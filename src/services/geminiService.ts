import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import {
  PortfolioData,
  DEFAULT_PORTFOLIO_DATA,
  buildPortfolioSystemInstruction,
  clonePortfolioData,
} from "../data/portfolio";

const API_KEY = process.env.API_KEY || "";

let chatSession: Chat | null = null;
let portfolioData: PortfolioData = clonePortfolioData(DEFAULT_PORTFOLIO_DATA);

// Rate limit settings: max 9 requests per minute
const RATE_LIMIT_COUNT = 9;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
let inMemoryTimestamps: number[] = [];

const checkAndIncrementRateLimit = (): void => {
  const now = Date.now();

  try {
    // Attempt to use localStorage for rate limiting (persistent across page refreshes)
    const stored = localStorage.getItem("gemini_chat_rate_limit");
    let timestamps: number[] = stored ? JSON.parse(stored) : [];

    // Filter out timestamps older than the 1-minute window
    timestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

    if (timestamps.length >= RATE_LIMIT_COUNT) {
      const oldestTimestamp = timestamps[0];
      const secondsToWait = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp)) / 1000);
      throw new Error(`Rate limit exceeded. Please wait ${secondsToWait} seconds before trying again.`);
    }

    timestamps.push(now);
    localStorage.setItem("gemini_chat_rate_limit", JSON.stringify(timestamps));
  } catch (error: any) {
    // If it's a rate limit error, propagate it
    if (error.message && error.message.includes("Rate limit exceeded")) {
      throw error;
    }

    // Fallback to in-memory rate limiting if localStorage is blocked (e.g. Incognito, private mode)
    console.warn("localStorage access failed, falling back to in-memory rate limiting:", error);
    
    inMemoryTimestamps = inMemoryTimestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

    if (inMemoryTimestamps.length >= RATE_LIMIT_COUNT) {
      const oldestTimestamp = inMemoryTimestamps[0];
      const secondsToWait = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp)) / 1000);
      throw new Error(`Rate limit exceeded. Please wait ${secondsToWait} seconds before trying again.`);
    }

    inMemoryTimestamps.push(now);
  }
};

export const configureGeminiPortfolioData = (data: PortfolioData): void => {
  portfolioData = clonePortfolioData(data);
  chatSession = null;
};

export const initializeChat = (): Chat => {
  if (!API_KEY) {
    console.warn("API_KEY is missing. Chat functionality will not work.");
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  chatSession = ai.chats.create({
    model: "gemini-3.1-flash-lite",
    config: {
      systemInstruction: buildPortfolioSystemInstruction(portfolioData),
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (
  message: string,
): Promise<AsyncIterable<GenerateContentResponse>> => {
  // Apply rate limiting check
  checkAndIncrementRateLimit();

  if (!chatSession) {
    try {
      chatSession = initializeChat();
    } catch (error) {
      throw new Error("Chat not initialized. Check API Key.");
    }
  }

  try {
    const responseStream = await chatSession.sendMessageStream({ message });
    return responseStream;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};

export const generateBlogContentStream = async (
  prompt: string,
  title?: string,
  description?: string,
  tags?: string[]
): Promise<AsyncIterable<GenerateContentResponse>> => {
  if (!API_KEY) {
    console.warn("API_KEY is missing. AI blog generator will not work.");
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const systemInstruction = 
    "You are an expert developer and technical blogger. Write a high-quality, comprehensive, and engaging blog post in Markdown format. " +
    "Keep the writing professional, concise, clear, and informative. Use proper markdown headers (starting with h2, i.e. '##', since h1 is " +
    "usually reserved for the main post title), list items, bold text, and code blocks with language specifiers where appropriate. " +
    "Do not wrap the entire response in a code block; output plain markdown text.";

  let contentPrompt = "Please write a blog post in Markdown format based on the following details:\n\n";
  if (title) {
    contentPrompt += `- **Title**: ${title}\n`;
  }
  if (description) {
    contentPrompt += `- **Brief Description/Goal**: ${description}\n`;
  }
  if (tags && tags.length > 0) {
    contentPrompt += `- **Tags/Keywords**: ${tags.join(", ")}\n`;
  }
  if (prompt) {
    contentPrompt += `- **Custom Guidelines/Instructions**: ${prompt}\n`;
  }

  contentPrompt += "\nWrite a detailed, engaging, and in-depth article. Focus on quality, accurate explanations, and practical code snippets. Write the article content directly in Markdown.";

  try {
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: [contentPrompt],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return responseStream;
  } catch (error) {
    console.error("Error generating blog content with Gemini:", error);
    throw error;
  }
};
