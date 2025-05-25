import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

type FaceVariant = 'normal' | 'evil' | 'subtle';

interface SeatedStickFigureProps {
  id: string;
  figureColor: string; // CSS color for the shirt/body
  name: string;
  description: string;
  positionStyle: React.CSSProperties;
  initialRotation?: number;
  headTurnAngle?: number;
  animationDelay?: string;
  faceVariant?: FaceVariant;
  customScale?: number; // Optional scale for the figure
}

const SeatedStickFigure: React.FC<SeatedStickFigureProps> = ({
  id,
  figureColor,
  name,
  description,
  positionStyle,
  initialRotation = 0,
  headTurnAngle = 0,
  animationDelay = '0s',
  faceVariant = 'normal',
  customScale = 1,
}) => {
  const figureRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  const isTransparent = figureColor.toLowerCase().startsWith('rgba') && parseFloat(figureColor.split(',')[3]) < 1;
  const logFillColor = isTransparent ? 'var(--color-log-desaturated-brown)' : 'var(--color-log-brown)';
  const logStrokeColor = isTransparent ? 'var(--color-log-desaturated-dark-brown)' : 'var(--color-log-dark-brown)';
  const figureOutlineColor = isTransparent ? 'rgba(55, 65, 81, 0.5)' : 'var(--color-figure-black)'; // Lighter outline for transparent

  useEffect(() => {
    if (!figureRef.current || !headRef.current || !bodyRef.current || !eyesRef.current) return;

    const baseRotation = initialRotation;
    const swayAmount = isTransparent ? 1.5 : 2; // Max sway in degrees from the base

    // Set initial state: base rotation and scale
    gsap.set(figureRef.current, { 
        rotation: baseRotation, 
        scale: customScale, 
        transformOrigin: 'bottom center' 
    });

    // Figure sway animation: yoyos between baseRotation - swayAmount and baseRotation + swayAmount
    gsap.to(figureRef.current, {
      rotation: `+=${swayAmount}`, // Relative rotation for one side of the sway
      duration: isTransparent ? 5 : 3.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: parseFloat(animationDelay) + 0.5,
    });
    
    // Body breathing animation
    gsap.to(bodyRef.current, {
      scaleY: 1.03,
      scaleX: 1.01,
      transformOrigin: 'bottom center',
      yoyo: true,
      repeat: -1,
      duration: 2.5,
      ease: 'sine.inOut',
      delay: parseFloat(animationDelay),
    });

    const eyes = eyesRef.current.querySelectorAll('.stick-figure-eye');
    if (eyes.length > 0) {
      gsap.to(eyes, {
        scaleY: 0.1,
        transformOrigin: 'center center',
        yoyo: true,
        repeat: -1,
        repeatDelay: 3 + Math.random() * 2,
        duration: 0.07,
        delay: parseFloat(animationDelay) + Math.random() * 2,
      });
    }
  }, [animationDelay, initialRotation, customScale, isTransparent]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (headRef.current) {
      gsap.to(headRef.current, { rotation: headTurnAngle, duration: 0.4, ease: 'power2.out', transformOrigin: 'center bottom' });
    }
    if (figureRef.current) {
      gsap.to(figureRef.current, { scale: customScale * 1.1, duration: 0.3, ease: 'power1.out' });
      figureRef.current.style.setProperty('--glow-color', isTransparent ? 'rgba(220, 220, 255, 0.7)' : figureColor);
      figureRef.current.classList.add('figure-hover-glow');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (headRef.current) {
      gsap.to(headRef.current, { rotation: 0, duration: 0.3, ease: 'power2.inOut', transformOrigin: 'center bottom' });
    }
    if (figureRef.current) {
      gsap.to(figureRef.current, { scale: customScale, duration: 0.2, ease: 'power1.in' });
      figureRef.current.classList.remove('figure-hover-glow');
    }
  };

  return (
    <div
      ref={figureRef}
      id={id}
      className={`group absolute cursor-default transition-all duration-300 ease-in-out ${isTransparent ? 'figure-shimmer' : ''}`}
      style={{ ...positionStyle, transformOrigin: 'bottom center', animationDelay }} // Ensure transformOrigin is set for initial GSAP set
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="figure"
      aria-labelledby={`${id}-name`}
    >
      <svg
        viewBox="-50 -100 100 120"
        width="100"
        height="120"
        style={{ filter: `drop-shadow(3px 3px 2px rgba(0,0,0,${isTransparent ? 0.2 : 0.5}))` }}
      >
        <path
          d="M -45 0 Q -20 -5 0 0 Q 20 -5 45 0 L 40 15 Q 0 20 -40 15 Z"
          fill={logFillColor}
          stroke={logStrokeColor}
          strokeWidth="2"
        />
        <path
          d="M -35 3 Q -15 0 0 3 Q 15 0 35 3 L 30 12 Q 0 15 -30 12 Z"
          fill={isTransparent ? 'rgba(92, 64, 41, 0.3)' : logStrokeColor}
          opacity="0.5"
        />

        <g ref={bodyRef} transform="translate(0, -35)" style={{ transformOrigin: 'center 25px' }}>
          <line x1="-10" y1="-5" x2="-20" y2="10" stroke={figureOutlineColor} strokeWidth="5" strokeLinecap="round" />
          <line x1="-20" y1="10" x2="-15" y2="25" stroke={figureOutlineColor} strokeWidth="5" strokeLinecap="round" />
          <line x1="10" y1="-5" x2="20" y2="10" stroke={figureOutlineColor} strokeWidth="5" strokeLinecap="round" />
          <line x1="20" y1="10" x2="15" y2="25" stroke={figureOutlineColor} strokeWidth="5" strokeLinecap="round" />

          <rect x="-15" y="-25" width="30" height="25" rx="5" fill={figureColor} stroke={figureOutlineColor} strokeWidth="2" />

          <line x1="-12" y1="-20" x2="-22" y2="-5" stroke={figureOutlineColor} strokeWidth="5" strokeLinecap="round" />
          <line x1="-22" y1="-5" x2="-25" y2="5" stroke={figureOutlineColor} strokeWidth="5" strokeLinecap="round" />
          <line x1="12" y1="-20" x2="22" y2="-5" stroke={figureOutlineColor} strokeWidth="5" strokeLinecap="round" />
          <line x1="22" y1="-5" x2="25" y2="5" stroke={figureOutlineColor} strokeWidth="5" strokeLinecap="round" />

          <g ref={headRef} transform="translate(0, -40)" style={{ transformOrigin: 'center 15px' }}>
            <circle cx="0" cy="0" r="15" fill={isTransparent ? 'rgba(255,255,255,0.7)' : 'white'} stroke={figureOutlineColor} strokeWidth="2" />

            <path d="M -10 -12 Q -5 -20 0 -15" stroke={figureOutlineColor} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 0 -18 Q 5 -22 8 -15" stroke={figureOutlineColor} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M -2 -14 Q 2 -20 5 -14" stroke={figureOutlineColor} strokeWidth="3" fill="none" strokeLinecap="round" transform="rotate(10)" />

            <g ref={eyesRef}>
              {faceVariant === 'evil' ? (
                <>
                  {/* Angled eyes for evil look */}
                  <path d="M -7 -3 L -4 0 L -7 1.5" stroke={figureOutlineColor} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M 7 -3 L 4 0 L 7 1.5" stroke={figureOutlineColor} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <circle cx="-5.5" cy="-0.5" r="1" fill={figureOutlineColor} className="stick-figure-eye" />
                  <circle cx="5.5" cy="-0.5" r="1" fill={figureOutlineColor} className="stick-figure-eye" />
                </>
              ) : (
                <>
                  <circle cx="-5" cy="-2" r="1.5" fill={figureOutlineColor} className="stick-figure-eye" />
                  <circle cx="5" cy="-2" r="1.5" fill={figureOutlineColor} className="stick-figure-eye" />
                </>
              )}
            </g>
            
            {faceVariant === 'evil' ? (
              <path d="M -6 5 Q 0 2 6 5 Q 0 7 -6 5" stroke={figureOutlineColor} strokeWidth="1.5" fill={figureOutlineColor} strokeLinecap="round" />
            ) : faceVariant === 'subtle' ? (
              <line x1="-4" y1="6" x2="4" y2="6" stroke={figureOutlineColor} strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M -5 5 Q 0 8 5 5" stroke={figureOutlineColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            )}
          </g>
        </g>
      </svg>

      <div
        className={`absolute -top-28 left-1/2 -translate-x-1/2 w-52 sm:w-56 px-3 py-2.5 text-xs text-text-light rounded-lg 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:-translate-y-2 pointer-events-none comic-panel-border-interactive z-20`}
        style={{ visibility: isHovered ? 'visible' : 'hidden' }}
      >
        <strong id={`${id}-name`} className={`block font-luckiestguy text-md sm:text-lg mb-1`} style={{color: isTransparent ? 'var(--color-text-light)' : figureColor}}>{name}</strong>
        <p className="font-comic-neue text-text-medium leading-snug text-xs sm:text-sm">{description}</p>
      </div>
    </div>
  );
};

export default SeatedStickFigure;