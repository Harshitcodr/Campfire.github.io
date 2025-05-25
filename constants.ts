export const APP_TITLE = "Last Man: Nuclear Bloom";
export const GEMINI_MODEL_TEXT = "gemini-2.5-flash-preview-04-17";

export const INITIAL_STORY_PROMPT = "Start the story of the Last Man. He wakes up in a ruined shelter. Describe his immediate surroundings and his first thoughts. End with 2 distinct choices for him to make.";

export const STORY_SYSTEM_INSTRUCTION = `You are a master storyteller crafting a gritty, post-apocalyptic interactive comic book. The world has been devastated by nuclear war. The protagonist is 'The Last Man', struggling for survival and sanity, searching for clues of the past and perhaps companionship. Each response should be a segment of the story, written in a narrative, engaging style. The story segment should be around 100-200 words. Crucially, each response MUST end with 2 to 3 clearly distinct, numbered choices for the player to make. Format choices like:
1. [Choice 1 text]
2. [Choice 2 text]
(If a 3rd choice) 3. [Choice 3 text]

Keep the tone dark, somber, but with occasional glimmers of hope or profound despair. The story must progress based on the choices. The output should be pure text, describing the scene, actions, and internal thoughts or dialogue. Do not include any meta-commentary or instructions to the player outside of the story and choices. If you describe a visual that could be a comic panel, make it vivid. Do not use markdown for emphasis, just plain text.`;

// STICK_FIGURE_DATA below provides base color class hints.
// The actual SeatedStickFigure components on HomePage.tsx now define their specific properties
// (name, description, position, figureColor using CSS vars like var(--color-figure-green)).
export const STICK_FIGURE_DATA = [
  { baseColor: 'fill-figure-blue', originalNameHint: "Archivist" }, 
  { baseColor: 'fill-figure-black', originalNameHint: "Machine" }, 
  { baseColor: 'fill-figure-green', originalNameHint: "Greenling" }, 
  { baseColor: 'fill-figure-red', originalNameHint: "Forge" },
  { baseColor: 'fill-figure-yellow', originalNameHint: "Beacon" } // Added yellow for potential use
];
// Note: The 'baseColor' values map to CSS variables defined in index.html (e.g., var(--color-figure-blue)).
// HomePage.tsx directly uses these CSS variables (e.g., 'var(--color-figure-green)') for the SeatedStickFigure's `figureColor` prop.