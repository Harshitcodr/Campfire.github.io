
import { GoogleGenAI, Chat, Content, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_TEXT, STORY_SYSTEM_INSTRUCTION } from '../constants';
import { Choice } from "../types";

let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set for Gemini API.");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const createChatSession = (history?: Content[]): Chat => {
  const genAI = getAI();
  return genAI.chats.create({
    model: GEMINI_MODEL_TEXT,
    config: {
      systemInstruction: STORY_SYSTEM_INSTRUCTION,
    },
    history: history || [],
  });
};

export const parseStoryResponse = (responseText: string): { storyText: string; choices: Choice[] } => {
  const lines = responseText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  let storyTextLines: string[] = [];
  let choices: Choice[] = [];
  
  const choiceRegex = /^\d+\.\s*(.*)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(choiceRegex);
    if (match) {
      choices.push({ id: `choice-${choices.length + 1}`, text: match[1].trim() });
    } else {
      // If we've already started finding choices, subsequent non-choice lines might be part of multi-line choices or errors.
      // For simplicity, we assume choices are single lines and story text ends before choices begin.
      // A more robust parser might be needed for complex cases.
      if (choices.length === 0) {
        storyTextLines.push(line);
      } else {
        // Potentially part of a multi-line choice if the regex was too simple.
        // For now, assume choices are single lines. If a choice is multi-line, this might misinterpret.
        // A more robust parser might look for a block of choices.
      }
    }
  }
  
  // If no choices were parsed using the regex, it's possible the format was slightly different.
  // Fallback: Assume the last 2-3 lines are choices if they look like list items without explicit numbering.
  // This is a heuristic and might not always be accurate.
  // For now, we rely on the strict "1. Choice" format.

  if (storyTextLines.length === 0 && lines.length > 0 && choices.length === 0) {
    // This means the entire response might be story text if no choices were formatted as expected.
    // Or it's an error message from the AI.
    storyTextLines = lines;
  }


  return {
    storyText: storyTextLines.join('\n\n'), // Add paragraph breaks
    choices: choices,
  };
};


export const sendMessageToChat = async (chat: Chat, message: string): Promise<GenerateContentResponse> => {
  try {
    const result = await chat.sendMessage({ message });
    return result;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error; // Re-throw to be handled by the caller
  }
};