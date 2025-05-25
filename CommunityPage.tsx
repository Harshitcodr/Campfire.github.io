import React from 'react';
import { MessageSquareText, Star, Users } from 'lucide-react';

const CommunityPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 content-container rounded-xl border-2 border-accent-yellow/30 text-center">
      <h1 className="font-bangers text-6xl sm:text-7xl text-accent-yellow mb-12 text-glow-yellow text-stroke-black filter drop-shadow-[0_0_5px_var(--color-accent-orange)]">
        The Nexus
      </h1>
      
      <div className="mb-12">
        <Users size={80} className="text-accent-orange mx-auto mb-6 animate-pulse-glow" />
        <h2 className="font-luckiestguy text-4xl text-text-light mb-4">
          Echoes Converge Here... Soon.
        </h2>
        <p className="font-comic-neue text-text-medium leading-relaxed text-lg max-w-xl mx-auto">
          The wasteland is vast, but perhaps not entirely empty. We're forging a space for survivors to share their tales, rate the most haunting echoes, and discuss the myriad paths taken through the Nuclear Bloom.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 bg-secondary-dark/50 rounded-lg border border-tertiary-dark">
          <MessageSquareText size={48} className="text-accent-yellow mx-auto mb-4"/>
          <h3 className="font-luckiestguy text-2xl text-accent-yellow mb-2">Story Discussions</h3>
          <p className="font-comic-neue text-text-light text-sm">Share your theories, favorite moments, and the choices that chilled you to the bone.</p>
        </div>
        <div className="p-6 bg-secondary-dark/50 rounded-lg border border-tertiary-dark">
          <Star size={48} className="text-accent-yellow mx-auto mb-4"/>
          <h3 className="font-luckiestguy text-2xl text-accent-yellow mb-2">Rate the Realities</h3>
          <p className="font-comic-neue text-text-light text-sm">Which narratives resonated? Which choices led to the most compelling fates? Your feedback will shape the echoes.</p>
        </div>
      </div>

      <p className="font-bangers text-3xl text-accent-orange animate-flicker">
        Patience, Survivor. The Nexus is Under Construction.
      </p>
      <p className="font-comic-neue text-text-medium mt-4 text-sm">
        (This feature is planned for a future update. Keep exploring!)
      </p>
    </div>
  );
};

export default CommunityPage;