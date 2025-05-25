
import React from 'react';
import { APP_TITLE } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 content-container rounded-xl border-2 border-accent-yellow/30">
      <h1 className="font-bangers text-6xl sm:text-7xl text-accent-yellow mb-8 text-center tracking-wider text-glow-yellow text-stroke-black filter drop-shadow-[0_0_5px_var(--color-accent-orange)]">{APP_TITLE}</h1>
      
      <section className="mb-10 p-4 bg-secondary-dark/30 rounded-lg border border-tertiary-dark shadow-inner">
        <h2 className="font-luckiestguy text-3xl sm:text-4xl text-accent-orange mb-4 filter drop-shadow-[0_0_3px_black]">The Story Unfurls</h2>
        <p className="text-text-light leading-relaxed mb-4">
          Welcome to a world shattered by nuclear fire, where survival is a daily struggle and sanity a fragile commodity.
          <strong>{APP_TITLE}</strong> is an interactive narrative experience that puts you in the shoes of 'The Last Man' (or so he believes). 
          Your choices guide his journey through the desolate ruins of civilization, uncovering echoes of the past and shaping his future.
        </p>
        <p className="text-text-light leading-relaxed">
          Will he find companionship? Will he rediscover what it means to be human? Or will the wasteland claim him, body and soul?
          The answers lie in the paths you choose.
        </p>
      </section>

      <section className="mb-10 p-4 bg-secondary-dark/30 rounded-lg border border-tertiary-dark shadow-inner">
        <h2 className="font-luckiestguy text-3xl sm:text-4xl text-accent-orange mb-4 filter drop-shadow-[0_0_3px_black]">How It Works</h2>
        <p className="text-text-light leading-relaxed mb-4">
          This game uses Google's Gemini API, a powerful generative AI, to weave a unique story based on your decisions. 
          Each choice you make prompts the AI to continue the narrative, creating a dynamic and unpredictable adventure.
        </p>
        <ul className="list-none space-y-3 pl-2 text-text-light">
          {[
            { title: "Interactive Choices", desc: "Guide the protagonist by selecting from available actions or dialogue options." },
            { title: "Dynamic Storytelling", desc: "No two playthroughs are exactly alike. The AI crafts new scenarios based on your input." },
            { title: "Bookmark Your Journey", desc: "Save 'Echoes' of your progress at key moments and return later to explore different outcomes." },
            { title: "Audio Narration", desc: "Immerse yourself further with text-to-speech narration of the story segments." }
          ].map(item => (
            <li key={item.title} className="flex items-start p-2 bg-tertiary-dark/50 rounded-md border-l-4 border-accent-yellow">
              <span className="font-luckiestguy text-accent-yellow text-2xl mr-3 mt-1">☢</span>
              <div>
                <strong className="font-roboto font-bold text-accent-yellow">{item.title}:</strong>
                <span className="ml-1">{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      
      <section className="mb-10 p-4 bg-secondary-dark/30 rounded-lg border border-tertiary-dark shadow-inner">
        <h2 className="font-luckiestguy text-3xl sm:text-4xl text-accent-orange mb-4 filter drop-shadow-[0_0_3px_black]">The Wasteland Beckons</h2>
        <p className="text-text-light leading-relaxed">
          This project is an exploration of AI-driven storytelling and interactive fiction. 
          It's a glimpse into how technology can create new forms of narrative engagement.
          The wasteland is vast, and its secrets are many. What will you discover?
        </p>
      </section>

      <section className="p-4 bg-red-900/30 rounded-lg border-2 border-red-500/70 shadow-lg">
        <h2 className="font-luckiestguy text-2xl text-red-400 mb-3 flex items-center">
          <span className="text-3xl mr-2">⚠️</span> Important Note on API Keys
        </h2>
        <p className="text-red-200 leading-relaxed font-mono text-sm">
          To play this game, you need to have a Google Gemini API key configured as an environment variable named <code>API_KEY</code>. 
          This application reads the key directly from <code>process.env.API_KEY</code>.
          Please ensure it is set up correctly in your environment before playing. Without it, the wasteland remains silent.
        </p>
      </section>

      <p className="text-center text-sm text-text-medium mt-12 italic animate-flicker">
        "In the ashes of the old world, new stories wait to be written... by you."
      </p>
    </div>
  );
};

export default AboutPage;