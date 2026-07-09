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

export const configureGeminiPortfolioData = (data: PortfolioData): void => {
  portfolioData = clonePortfolioData(data);
  chatSession = null;
};

export const initializeChat = (): Chat => {
  if (!API_KEY) {
    console.warn("API_KEY is missing. Chat functionality will not work.");
    // We return a dummy object or handle this in the component, but for type safety:
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  chatSession = ai.chats.create({
    model: "gemini-2.5-flash",
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
