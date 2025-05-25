
import { Content } from "@google/genai";

export interface Choice {
  id: string;
  text: string;
}

export interface StorySegment {
  text: string;
  choices: Choice[];
  imagePrompt?: string; // Optional: if AI suggests an image
}

export interface Bookmark {
  id: string; // timestamp or unique ID
  name: string; // User-given name or auto-generated
  storyPreview: string; // First few lines of the story text
  chatHistory: Content[];
  currentStoryText: string;
  currentChoices: Choice[];
  createdAt: number;
}

export interface StickFigureProps {
  color: string;
  hoverColor: string;
  name: string;
  textColor: string;
}