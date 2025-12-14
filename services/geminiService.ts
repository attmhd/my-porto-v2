import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { USER_INFO, PROJECTS, TECH_STACK, EDUCATION, CERTIFICATES } from '../constants';

const API_KEY = process.env.API_KEY || '';

// System instruction to give the AI context about the persona
const SYSTEM_INSTRUCTION = `
You are an AI assistant for the portfolio website of ${USER_INFO.name}.
Your goal is to represent ${USER_INFO.name} professionally and answer questions about their background, skills, and projects.
Here is the context about ${USER_INFO.name}:

Role: ${USER_INFO.role}
About: ${USER_INFO.about}
Location: ${USER_INFO.location}
Contact: ${USER_INFO.email}

Tech Stack: ${TECH_STACK.map(t => t.name).join(', ')}.
Projects: ${PROJECTS.map(p => `${p.title} (${p.category}): ${p.description}`).join('; ')}.
Education: ${EDUCATION.map(e => `${e.degree} from ${e.institution}`).join('; ')}.
Certificates: ${CERTIFICATES.map(c => c.name).join(', ')}.

Tone: Professional, enthusiastic, concise, and helpful.
If asked about hiring, encourage them to contact via email.
If asked about something outside this context, politely steer the conversation back to ${USER_INFO.name}'s professional profile.
Do not hallucinate projects that are not listed.
`;

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (!API_KEY) {
    console.warn("API_KEY is missing. Chat functionality will not work.");
    // We return a dummy object or handle this in the component, but for type safety:
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<GenerateContentResponse>> => {
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
