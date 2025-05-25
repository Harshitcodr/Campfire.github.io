
import React from 'react';

interface ComicPanelProps {
  text: string;
  imagePrompt?: string; 
}

const ComicPanel: React.FC<ComicPanelProps> = ({ text, imagePrompt }) => {
  const paragraphs = text.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);

  const hashCode = (str: string | undefined) => {
    if (!str) return 'default_seed';
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; 
    }
    return Math.abs(hash).toString();
  };

  return (
    <div 
      className="my-6 rounded-md 
                 transform -skew-x-1 hover:skew-x-0 transition-transform duration-300 ease-in-out"
      role="article"
      aria-labelledby="comic-panel-heading"
    >
      {imagePrompt && (
        <div className="mb-4 border-2 border-black p-1 bg-gray-200 shadow-inner rounded-t-lg">
          <img 
            src={`https://picsum.photos/seed/${hashCode(imagePrompt)}/600/200?grayscale&blur=1`} 
            alt={`Visual representation: ${imagePrompt}`} 
            className="w-full h-auto object-cover opacity-80 rounded-sm" 
          />
          <p id="comic-panel-heading" className="text-xs text-center text-gray-700 font-mono italic mt-1 p-1 bg-white/50">
            [SCENE: {imagePrompt}]
          </p>
        </div>
      )}
      <div className="speech-balloon"> {/* Speech balloon styling */}
        <div className="font-comic-neue text-base sm:text-lg leading-relaxed space-y-3 sm:space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="first-letter:font-bold first-letter:text-xl">
              {paragraph}
            </p>
          ))}
        </div>
        {paragraphs.length === 0 && !imagePrompt && (
          <p className="font-comic-neue text-gray-500 italic text-center py-4">
            [The air crackles with anticipation... or is it just static?]
          </p>
        )}
      </div>
    </div>
  );
};

export default ComicPanel;