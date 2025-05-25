
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SeatedStickFigure from '../components/SeatedStickFigure'; // New component
import { Send, Ghost, MessagesSquare, Atom, RadioTower } from 'lucide-react'; // Kept relevant icons

// Dynamic Campfire Component (retained)
const DynamicCampfire: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 150 150" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="fireGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="subtleSmokeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="smokeBlur"/>
            <feComponentTransfer in="smokeBlur" result="lowSmoke">
                <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
                <feMergeNode in="lowSmoke"/>
                 <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
      </defs>
      <style>
        {`
          .log-main { fill: #6B4226; stroke: #402814; stroke-width: 1.5; }
          .log-detail { fill: #805333; }
          .flame-core { animation: flickerCore 0.8s infinite alternate; transform-origin: 50% 100%; }
          .flame-outer { animation: flickerOuter 1.2s infinite alternate; transform-origin: 50% 100%; opacity: 0.8; }
          .flame-accent { animation: flickerAccent 1s infinite alternate; transform-origin: 50% 100%; opacity: 0.6; }
          
          @keyframes flickerCore {
            0% { transform: scaleY(1) scaleX(1) skewX(-2deg); fill: #FFD700; }
            50% { transform: scaleY(0.9) scaleX(1.1) skewX(2deg); fill: #FFA500; }
            100% { transform: scaleY(1.05) scaleX(0.95) skewX(-1deg); fill: #FFB347; }
          }
          @keyframes flickerOuter {
            0% { transform: scaleY(1) scaleX(1) skewY(3deg); fill: #FF8C00; }
            50% { transform: scaleY(1.1) scaleX(0.9) skewY(-2deg); fill: #FF4500; opacity:0.7; }
            100% { transform: scaleY(0.95) scaleX(1.05) skewY(1deg); fill: #FFA500; opacity:0.9; }
          }
           @keyframes flickerAccent {
            0% { transform: scaleY(0.8) scaleX(1.2) skewX(5deg); fill: #DC143C; }
            50% { transform: scaleY(1) scaleX(1) skewX(-5deg); fill: #FF6347; opacity:0.5; }
            100% { transform: scaleY(0.85) scaleX(1.1) skewX(3deg); fill: #FF0000; opacity:0.7; }
          }

          .spark { animation: sparkAnim 1.8s infinite ease-out; opacity: 0; fill: #FFA500; }
          .spark.s1 { animation-delay: 0s; }
          .spark.s2 { animation-delay: 0.25s; }
          .spark.s3 { animation-delay: 0.5s; }
          .spark.s4 { animation-delay: 0.75s; }
          .spark.s5 { animation-delay: 1s; }
           @keyframes sparkAnim {
            0% { transform: translateY(0px) scale(1.2); opacity: 1; }
            100% { transform: translateY(-50px) scale(0.3); opacity: 0; }
          }
          .smoke {
            fill: #555;
            opacity: 0;
            transform-origin: 50% 80%;
            animation: smokeDrift 8s infinite linear;
          }
          .smoke1 { animation-delay: 0s; }
          .smoke2 { animation-delay: -4s; }
          @keyframes smokeDrift {
            0% { opacity: 0; transform: translateY(0) translateX(0) scale(0.5) rotate(0deg); }
            25% { opacity: 0.2; transform: translateY(-20px) translateX(10px) scale(0.8) rotate(15deg); }
            50% { opacity: 0.1; transform: translateY(-40px) translateX(-5px) scale(1) rotate(-10deg); }
            75% { opacity: 0.05; transform: translateY(-60px) translateX(15px) scale(1.2) rotate(20deg); }
            100% { opacity: 0; transform: translateY(-80px) translateX(0px) scale(1.3) rotate(0deg); }
          }
        `}
      </style>
      {/* SVG content for campfire logs, flames, sparks, smoke */}
      <path className="log-main" d="M40 125 Q50 118 75 120 Q100 118 110 125 L100 135 Q75 130 50 135 Z" />
      <path className="log-detail" d="M45 123 Q50 120 75 122 Q100 120 105 123 L100 130 Q75 127 50 130 Z" />
      <path className="log-main" d="M45 115 Q35 110 65 112 Q95 110 105 115 L95 125 Q65 120 55 125 Z" transform="rotate(25 75 120)" />
      <path className="log-detail" d="M50 113 Q45 110 65 111 Q90 110 95 113 L90 120 Q65 117 60 120 Z" transform="rotate(25 75 120)" />
      <path className="log-main" d="M50 110 Q40 105 70 107 Q100 105 90 110 L80 120 Q50 115 60 120 Z" transform="rotate(-20 75 115)" />
      <path className="log-detail" d="M55 108 Q50 105 70 106 Q90 105 85 108 L75 115 Q50 112 65 115 Z" transform="rotate(-20 75 115)" />
      <path className="smoke smoke1" filter="url(#subtleSmokeGlow)" d="M75 50 Q70 40 80 30 Q90 40 85 50 Q80 60 75 50 Z" />
      <path className="smoke smoke2" filter="url(#subtleSmokeGlow)" d="M65 55 Q75 45 70 35 Q60 45 65 55 Q70 65 65 55 Z" />
      <g filter="url(#fireGlow)">
        <ellipse className="flame-accent" cx="75" cy="80" rx="18" ry="45" transform="rotate(15 75 100)" />
        <ellipse className="flame-outer" cx="75" cy="85" rx="25" ry="55" transform="rotate(-5 75 100)" />
        <ellipse className="flame-core" cx="75" cy="90" rx="20" ry="40" />
        <ellipse className="flame-outer" cx="65" cy="90" rx="15" ry="35" transform="rotate(10 65 100)" opacity="0.7"/>
        <ellipse className="flame-accent" cx="85" cy="90" rx="15" ry="35" transform="rotate(-10 85 100)" opacity="0.6"/>
      </g>
      <circle className="spark s1" cx="75" cy="60" r="2.5" />
      <circle className="spark s2" cx="68" cy="55" r="2" />
      <circle className="spark s3" cx="82" cy="58" r="2.2" />
      <circle className="spark s4" cx="72" cy="50" r="1.8" />
      <circle className="spark s5" cx="78" cy="45" r="2" />
    </svg>
  );
};


const AnimatedTitle: React.FC<{ text: string, className?: string, charClassName?: string }> = ({ text, className, charClassName }) => {
  return (
    <h1 className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`animated-title-char ${charClassName || ''}`}
          style={{ animationDelay: `${index * 0.06}s` }} 
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

const HomePage: React.FC = () => {
  const [currentWhisper, setCurrentWhisper] = useState(0);
  
  const whispers = [
    "Ash and echoes... that's all that's left. Or is it? ☢️",
    "Every choice, a new reality. Choose wisely, survivor.",
    "Madness or enlightenment? The line blurs in the fallout. 💀",
    "Can hope truly bloom in a nuclear wasteland? 🔥",
    "Some seek power. Some seek peace. What do you seek, delicious friend?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWhisper(prev => (prev + 1) % whispers.length);
    }, 4500); 
    return () => clearInterval(interval);
  }, [whispers.length]);

  const stickFigures = [
    { 
      id: "figure-blue", name: "Azure Dreamer", 
      description: "Lost in reverie, gazes towards the hopeful Golden Beacon.", 
      figureColor: 'var(--color-figure-blue)', 
      positionStyle: { top: '8%', left: '25%', transform: 'translate(-50%, -50%)', width: '100px', height: '120px' },
      initialRotation: -20, 
      headTurnAngle: 45, 
      animationDelay: '0.1s',
      faceVariant: 'normal',
    },
    { 
      id: "figure-yellow", name: "Golden Beacon", 
      description: "Radiates faint warmth, turns to the distant Ethereal Echo.", 
      figureColor: 'var(--color-figure-yellow)', 
      positionStyle: { top: '8%', right: '25%', transform: 'translate(50%, -50%)', width: '100px', height: '120px' },
      initialRotation: 20, 
      headTurnAngle: 75, 
      animationDelay: '0.5s',
      faceVariant: 'normal',
    },
    { 
      id: "figure-transparent", name: "Ethereal Echo", 
      description: "A whisper of what was, notes the Verdant Listener far below.", 
      figureColor: 'rgba(200, 210, 230, 0.4)', 
      positionStyle: { top: '50%', right: '3%', transform: 'translateY(-50%) scale(0.95)', width: '90px', height: '110px' }, // Adjusted scale directly
      initialRotation: 90, 
      headTurnAngle: 60, 
      animationDelay: '0.35s',
      faceVariant: 'subtle',
      customScale: 0.95, // Keep for logic if needed, but direct scale in positionStyle
    },
    { 
      id: "figure-green", name: "Verdant Listener", 
      description: "Head tilted up, Senses life's faint pulse. Glances towards the Crimson Sentry.", 
      figureColor: 'var(--color-figure-green)', 
      positionStyle: { bottom: '5%', right: '25%', transform: 'translate(50%, 50%)', width: '100px', height: '120px' },
      initialRotation: 145, 
      headTurnAngle: -60, 
      animationDelay: '0s',
      faceVariant: 'normal',
    },
    { 
      id: "figure-red", name: "Crimson Sentry", 
      description: "Vigilant, head up, watches for danger. Acknowledges the Shadow Lurker.", 
      figureColor: 'var(--color-figure-red)', 
      positionStyle: { bottom: '5%', left: '25%', transform: 'translate(-50%, 50%)', width: '100px', height: '120px' },
      initialRotation: -145, 
      headTurnAngle: 60, 
      animationDelay: '0.2s',
      faceVariant: 'normal',
    },
    { 
      id: "figure-purple", name: "Shadow Lurker", 
      description: "Concealed by darkness, turns its gaze upwards to the Azure Dreamer.", 
      figureColor: 'var(--color-figure-purple)', 
      positionStyle: { top: '50%', left: '3%', transform: 'translateY(-50%)', width: '100px', height: '120px' },
      initialRotation: -90, 
      headTurnAngle: -60, 
      animationDelay: '0.65s',
      faceVariant: 'evil',
    }
  ];


  return (
    <div className="flex flex-col items-center text-center p-2 sm:p-4 min-h-[80vh] overflow-hidden relative">
      
      <header className="my-10 sm:my-12 relative w-full z-10">
        <div className="absolute inset-0 halftone-overlay opacity-25 z-0"></div>
        <AnimatedTitle 
            text="LAST MAN" 
            className="relative z-10 text-7xl md:text-8xl lg:text-9xl font-bangers text-accent-yellow tracking-wider leading-none text-glow-yellow text-stroke-black filter drop-shadow-[0_0_15px_var(--color-accent-orange)]"
        />
        <p 
            className="relative z-10 text-3xl md:text-4xl font-luckiestguy text-text-light mt-2 sm:mt-3 filter drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] glitch-text"
            data-text="Nuclear Bloom"
        >
          Nuclear Bloom
        </p>
        <p className="relative z-10 text-md text-text-medium mt-8 max-w-xl mx-auto p-5 rounded-lg 
                       font-luckiestguy bg-tertiary-dark/90 text-accent-yellow 
                       border-4 border-accent-orange animate-description-box-glow-anim
                       hover:scale-105 hover:shadow-2xl hover:border-accent-yellow transition-all duration-300 ease-in-out
                       description-box-enhanced">
          The world is ash. He walks alone. Or does he? Your choices forge a path through a reality torn by nuclear fire. Memory is a weapon, survival a grim art. What awaits in the bloom of devastation? ☢️
        </p>
      </header>

      <div className="relative mb-16 sm:mb-24 flex items-center justify-center group w-full max-w-3xl h-[550px] sm:h-[650px] z-10"> {/* Increased height for more tooltip space */}
        <DynamicCampfire 
            className="w-56 h-56 sm:w-72 sm:h-72 filter drop-shadow-[0_0_35px_var(--color-accent-orange)] z-10"
        />
        {/* Stick Figures Container */}
        <div className="absolute inset-0 w-full h-full"> 
          {stickFigures.map((figure) => (
            <SeatedStickFigure
              key={figure.id}
              id={figure.id}
              name={figure.name}
              description={figure.description}
              figureColor={figure.figureColor}
              positionStyle={figure.positionStyle}
              initialRotation={figure.initialRotation}
              headTurnAngle={figure.headTurnAngle}
              animationDelay={figure.animationDelay}
              faceVariant={figure.faceVariant as 'normal' | 'evil' | 'subtle'}
              customScale={figure.customScale}
            />
          ))}
        </div>
         <p className="absolute bottom-[-50px] sm:bottom-[-40px] left-1/2 transform -translate-x-1/2 text-sm text-text-medium mt-6 sm:mt-8 italic animate-text-flicker-fast z-0">
          Around the embers, silent watchers share the fading light... and shadows.
        </p>
      </div>
      
      <Link
        to="/game"
        className="btn-primary my-10 sm:my-12 z-10" 
        aria-label="Begin Your Chronicle"
      >
        Begin Your Chronicle <Send size={36} className="inline-block ml-3 mb-1.5 transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300"/>
      </Link>

      <div className="section-divider z-10"></div>

      <section className="w-full max-w-4xl mx-auto my-12 sm:my-16 p-6 sm:p-8 bg-secondary-dark/60 content-container rounded-xl comic-panel-border relative halftone-overlay z-10">
        <AnimatedTitle 
            text="Echoes of a Lost World"
            className="font-bangers text-5xl sm:text-6xl text-accent-orange mb-10 text-center text-glow-yellow text-stroke-black filter drop-shadow-[0_0_8px_black]"
            charClassName="drop-shadow-[1px_1px_0px_black]"
        />
        <p className="font-comic-neue text-text-light text-center mb-12 text-lg leading-relaxed">
          The past isn't just buried; it's radioactive, seeping into the present. Uncover fragments of what was, and what might yet be. Your choices determine which echoes define your bleak reality. Sanity is a currency. Hope, a rare artifact. 💀🔥
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {[
            { title: "Twisted Fates", icon: <MessagesSquare size={40} className="text-accent-yellow"/>, text: "Dialogue that bites back. Forge fragile alliances, ignite bitter rivalries, or embrace the chilling solace of solitude. Every word is a trigger." },
            { title: "Memory Scars", icon: <Ghost size={40} className="text-accent-red"/>, text: "Glitched holotapes, blood-stained diaries, murals of madness. Piece together the cataclysm... and your own shattered identity." },
            { title: "Wasteland Encounters", icon: <RadioTower size={40} className="text-green-400"/>, text: "The Last Man? Perhaps not. Meet others warped by this new world: The Archivist, Machine Priestess, Greenling, Blacksmith. Trust is a ghost." },
            { title: "Sanity's Razor Edge", icon: <Atom size={40} className="text-orange-400"/>, text: "Isolation. Grotesque sights. Impossible choices. Your mind is a battlefield. Lose, and the wasteland will craft a special hell for you." }
          ].map((item) => (
            <div 
                key={item.title} 
                className="bg-primary-dark/70 p-5 rounded-lg border-2 border-tertiary-dark comic-panel-border transform transition-all duration-300 hover:bg-tertiary-dark/80 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-secondary-dark rounded-full mr-4 border-2 border-accent-yellow/60 shadow-md">{item.icon}</div>
                <h3 className="font-luckiestguy text-2xl sm:text-3xl text-accent-yellow filter drop-shadow-[0_0_3px_black]">{item.title}</h3>
              </div>
              <p className="font-comic-neue text-sm text-text-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
         <p className="text-center text-xs text-text-medium mt-12 italic animate-flicker">
           [SYSTEM LOG: Narrative instability critical. User intervention imperative for timeline coherence.]
         </p>
      </section>

      <div className="section-divider z-10"></div>
      
      <section className="w-full py-12 sm:py-16 creator-section my-12 sm:my-16 z-10">
          <div className="max-w-3xl mx-auto text-center p-6">
            <AnimatedTitle 
                text="A Story Forged By"
                className="font-bangers text-5xl sm:text-6xl text-accent-yellow mb-8 text-glow-yellow text-stroke-black filter drop-shadow-[0_0_8px_black]"
            />
            <div className="flex flex-col items-center">
                <div className="creator-image-container mb-6">
                    {/* Basic placeholder SVG if image is missing */}
                    <svg viewBox="0 0 100 100" className="creator-image" style={{display: 'none'}} data-role="placeholder-svg">
                        <rect width="100" height="100" fill="var(--color-tertiary-dark)" />
                        <text x="50" y="55" fontFamily="Comic Neue" fontSize="12" fill="var(--color-text-medium)" textAnchor="middle">Creator</text>
                        <text x="50" y="70" fontFamily="Comic Neue" fontSize="12" fill="var(--color-text-medium)" textAnchor="middle">Image</text>
                    </svg>
                    <img src="./assets/placeholder-creator.png" alt="Harshit" className="creator-image" 
                         onError={(e) => {
                             e.currentTarget.style.display = 'none';
                             const placeholderSvg = e.currentTarget.parentElement?.querySelector('[data-role="placeholder-svg"]');
                             // Fix: Cast placeholderSvg to HTMLElement before accessing its style property
                             if(placeholderSvg && placeholderSvg instanceof HTMLElement) placeholderSvg.style.display = 'block';
                             const placeholderTextContainer = document.createElement('span');
                             placeholderTextContainer.className = 'creator-image-placeholder-text';
                             placeholderTextContainer.innerHTML = 'Harshit.jpg<br/>(Image Load Error)';
                             if(e.currentTarget.parentElement && !e.currentTarget.parentElement.querySelector('.creator-image-placeholder-text')) {
                                 e.currentTarget.parentElement.appendChild(placeholderTextContainer);
                             }
                         }}/>
                </div>
                <p className="font-luckiestguy text-4xl text-text-light mb-3">Harshit</p>
                <p className="font-comic-neue text-text-medium max-w-md mx-auto leading-relaxed">
                    The mind behind these wasteland tales, weaving narratives from the digital ether.
                    This world is a canvas of choices, painted with the palette of the Gemini API.
                </p>
                 <p className="text-xs text-text-medium mt-6 animate-flicker">
                    [Developer Note: Ensure 'public/assets/placeholder-creator.png' exists or replace with your image!]
                </p>
            </div>
          </div>
      </section>

      <div className="text-center my-12 p-4 z-10">
        <p className="font-luckiestguy text-xl sm:text-2xl text-accent-yellow mb-2">Wasteland Whispers:</p>
        <p className="text-text-medium italic font-comic-neue h-10 sm:h-8 text-sm sm:text-base animate-flicker transition-opacity duration-500 flex items-center justify-center px-2">
          "{whispers[currentWhisper]}"
        </p>
      </div>

    </div>
  );
};

export default HomePage;