
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Chat, Content } from '@google/genai';
import { createChatSession, sendMessageToChat, parseStoryResponse } from '../services/geminiService';
import { INITIAL_STORY_PROMPT } from '../constants';
import { Choice, StorySegment } from '../types';
import ComicPanel from '../components/ComicPanel';
import InteractiveChoiceButton from '../components/InteractiveChoiceButton';
import { SpinnerIcon } from '../components/icons/SpinnerIcon';
import { PlayIcon } from '../components/icons/PlayIcon';
import { PauseIcon } from '../components/icons/PauseIcon';
import { BookmarkIcon } from '../components/icons/BookmarkIcon';
import { BookmarkedIcon } from '../components/icons/BookmarkedIcon'; 
import useSpeechSynthesis from '../hooks/useSpeechSynthesis';
import { useBookmarks } from '../contexts/BookmarkContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavCampfireIcon } from '../components/icons/CampfireIcon';
import confetti from 'canvas-confetti';
import { BookOpen, Cog, ShieldAlert, Atom } from 'lucide-react'; // For character archetype icons


const GameIntro: React.FC = () => (
  <div className="max-w-3xl mx-auto p-6 mb-10 content-container rounded-xl border-2 border-accent-yellow/30 text-center">
    <h2 className="font-bangers text-5xl sm:text-6xl text-accent-orange mb-6 text-glow-yellow text-stroke-black">
      The Bloom... or the Blight?
    </h2>
    <p className="font-comic-neue text-text-light leading-relaxed mb-4 text-lg">
      Decades ago, the sky bled fire. Now, the world is a tapestry of ash, twisted metal, and haunting echoes. 
      You stir in the ruins, a lone flicker in an ocean of desolation. Or are you?
    </p>
    <p className="font-comic-neue text-text-medium leading-relaxed mb-6 text-md">
      They say Hell is close, immortality is a wasteland rumor, and the screaming has... mostly... stopped.
      Your choices will sculpt your sanity, nurture frail hopes, or shatter them against the unforgiving concrete.
      What will you become, <strong className="text-accent-yellow font-luckiestguy">delicious survivor</strong>?
    </p>
    <div className="my-6 border-t border-b border-tertiary-dark py-4">
        <h3 className="font-luckiestguy text-2xl text-accent-yellow mb-3">Whispers in the Static - Potential Fates:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {[
                {name: "The Archivist", icon: <BookOpen size={20}/>},
                {name: "Machine Priestess", icon: <Cog size={20}/>},
                {name: "Greenling Scavenger", icon: <Atom size={20}/>},
                {name: "The Blacksmith", icon: <ShieldAlert size={20}/>}
            ].map(char => (
                <div key={char.name} className="flex flex-col items-center p-2 bg-secondary-dark/50 rounded">
                    <span className="text-accent-orange mb-1">{char.icon}</span>
                    <span className="font-comic-neue text-text-light">{char.name}</span>
                </div>
            ))}
        </div>
    </div>
    <p className="font-comic-neue text-text-medium text-sm italic">
      The Geiger counter clicks a lullaby. Your story begins...
    </p>
  </div>
);


const GamePage: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [storySegment, setStorySegment] = useState<StorySegment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { speak, cancel, isSpeaking, isSupported } = useSpeechSynthesis();
  const { addBookmark, getBookmarkById, bookmarks } = useBookmarks();
  const [chatHistoryForBookmark, setChatHistoryForBookmark] = useState<Content[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // To show intro before game loads

  const location = useLocation();
  const navigate = useNavigate();
  const initialLoadRef = useRef(true);

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['var(--color-accent-yellow)', 'var(--color-accent-orange)', '#FFFFFF', '#60a5fa']
    });
  };
  
  useEffect(() => {
    if (storySegment) {
        const currentContent = chatHistoryForBookmark[chatHistoryForBookmark.length - 1]?.parts[0]?.text;
        const alreadyExists = bookmarks.some(b => b.currentStoryText === storySegment.text && b.chatHistory[b.chatHistory.length-1]?.parts[0]?.text === currentContent);
        setIsBookmarked(alreadyExists);
    }
  }, [storySegment, bookmarks, chatHistoryForBookmark]);


  const startNewStory = useCallback(async (initialHistory?: Content[], loadedStoryText?: string, loadedChoices?: Choice[]) => {
    setIsLoading(true);
    setError(null);
    setShowIntro(false); // Hide intro once game loading starts
    if (isSpeaking) cancel();
    try {
      const newChat = createChatSession(initialHistory);
      setChat(newChat);
      
      if (initialHistory && initialHistory.length > 0 && loadedStoryText && loadedChoices) {
        setStorySegment({ text: loadedStoryText, choices: loadedChoices });
        setChatHistoryForBookmark([...initialHistory]);
      } else if (initialHistory && initialHistory.length > 0) {
        const lastModelMessage = initialHistory[initialHistory.length -1];
        if(lastModelMessage.role === 'model' && lastModelMessage.parts[0] && typeof lastModelMessage.parts[0].text === 'string') {
            const parsed = parseStoryResponse(lastModelMessage.parts[0].text);
            setStorySegment({ text: parsed.storyText, choices: parsed.choices });
            setChatHistoryForBookmark([...initialHistory]);
        } else {
            const response = await sendMessageToChat(newChat, INITIAL_STORY_PROMPT);
            const parsed = parseStoryResponse(response.text);
            setStorySegment({ text: parsed.storyText, choices: parsed.choices });
            setChatHistoryForBookmark([
                { role: 'user', parts: [{ text: INITIAL_STORY_PROMPT }] },
                { role: 'model', parts: [{ text: response.text }] }
            ]);
            if(!initialHistory) triggerConfetti(); // Confetti on very first story load
        }
      } else {
        const response = await sendMessageToChat(newChat, INITIAL_STORY_PROMPT);
        const parsed = parseStoryResponse(response.text);
        setStorySegment({ text: parsed.storyText, choices: parsed.choices });
        setChatHistoryForBookmark([
            { role: 'user', parts: [{ text: INITIAL_STORY_PROMPT }] },
            { role: 'model', parts: [{ text: response.text }] }
        ]);
        triggerConfetti(); // Confetti on very first story load
      }

    } catch (err) {
      console.error(err);
      setError('Failed to start new story. Is your API Key configured? Or the wasteland spirits are restless...');
      setShowIntro(true); // Show intro again if error
    } finally {
      setIsLoading(false);
    }
  }, [isSpeaking, cancel]);


  useEffect(() => {
    if (initialLoadRef.current) {
        initialLoadRef.current = false;
        const queryParams = new URLSearchParams(location.search);
        const bookmarkId = queryParams.get('bookmarkId');

        if (bookmarkId) {
            setShowIntro(false); // Don't show intro if loading from bookmark
            const bookmark = getBookmarkById(bookmarkId);
            if (bookmark) {
                startNewStory(bookmark.chatHistory, bookmark.currentStoryText, bookmark.currentChoices);
                navigate(location.pathname, { replace: true }); 
            } else {
                setError(`Echo with ID ${bookmarkId} faded away... Starting new story.`);
                startNewStory(); // Will hide intro within itself
            }
        } else {
            setShowIntro(true); // Show intro for a fresh start
            // Don't auto-start story here, let user click a button after intro, or remove intro to auto-start
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, getBookmarkById, navigate]); // Removed startNewStory from deps to avoid loop on intro screen


  const handleChoice = async (choiceText: string) => {
    if (!chat || isLoading) return;

    setIsLoading(true);
    setError(null);
    if (isSpeaking) cancel();

    try {
      const response = await sendMessageToChat(chat, choiceText);
      const parsed = parseStoryResponse(response.text);
      setStorySegment({ text: parsed.storyText, choices: parsed.choices });
      setChatHistoryForBookmark(prevHistory => [
        ...prevHistory,
        { role: 'user', parts: [{ text: choiceText }] },
        { role: 'model', parts: [{ text: response.text }] }
      ]);
      triggerConfetti();
    } catch (err) {
      console.error(err);
      setError('The wasteland static interferes... Failed to get next part of the story. Try another path or check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmark = () => {
    if (storySegment && chatHistoryForBookmark.length > 0 && !isBookmarked) {
      const bookmarkName = prompt("Name this echo of time (bookmark):", `Fragment: "${storySegment.text.substring(0,25)}..."`);
      if (bookmarkName) {
        addBookmark({
          name: bookmarkName,
          chatHistory: [...chatHistoryForBookmark], 
          currentStoryText: storySegment.text,
          currentChoices: storySegment.choices,
        });
        alert("Echo saved! This moment is preserved.");
        setIsBookmarked(true);
      }
    } else if (isBookmarked) {
        alert("This moment is already etched in time (bookmarked).");
    }else {
      alert("Cannot save echo yet. Story fragment not fully loaded or history is empty.");
    }
  };

  const toggleNarration = () => {
    if (!storySegment?.text) return;
    if (isSpeaking) {
      cancel();
    } else {
      const narrationText = storySegment.text.replace(/^\d+\.\s*/gm, '');
      speak(narrationText);
    }
  };
  
  if (showIntro && !isLoading && !error && !storySegment) {
    return (
        <>
            <GameIntro />
            <div className="text-center mt-8">
                 <button onClick={() => startNewStory()} className="btn-primary text-3xl">
                    Descend into the Ruins
                </button>
            </div>
        </>
    );
  }

  if (isLoading && !storySegment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 content-container rounded-lg">
        <SpinnerIcon className="w-20 h-20 text-accent-yellow mb-6 animate-spin" />
        <p className="font-luckiestguy text-2xl text-text-light mb-2">Dust devils swirl... Unearthing your fate...</p>
        <p className="text-text-medium">The old world whispers, please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 content-container rounded-lg border-2 border-red-500/50">
        <p className="font-bangers text-5xl text-red-500 mb-4 text-stroke-black">A Howl of Static!</p>
        <p className="text-text-light mb-6 bg-secondary-dark/70 p-3 rounded">{error}</p>
        <button
          onClick={() => { 
            initialLoadRef.current = true; 
            setShowIntro(true); 
            setStorySegment(null); 
            setError(null);
            // navigate(location.pathname, { replace: true }); // Clears params like bookmarkId
          }}
          className="btn-primary"
        >
          Return to Wasteland's Edge
        </button>
      </div>
    );
  }

  if (!storySegment && !isLoading && !showIntro) { // Should not happen often if intro logic is correct
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 content-container rounded-lg">
        <NavCampfireIcon className="w-24 h-24 text-accent-orange opacity-50 mb-6"/>
        <p className="font-luckiestguy text-xl text-text-medium">The wasteland is eerily silent... preparing your journey.</p>
         <button onClick={() => {initialLoadRef.current = true; setShowIntro(true);}} className="btn-primary mt-6">Return to Start</button>
      </div>
    );
  }
  
  if (!storySegment) return null; // If still no storySegment after all checks (and not loading/error/intro)

  return (
    <div className="max-w-3xl mx-auto">
      <ComicPanel text={storySegment.text} imagePrompt={storySegment.imagePrompt} />

      <div className="my-8 flex justify-center sm:justify-end items-center space-x-3 p-3 bg-secondary-dark/50 rounded-md border border-tertiary-dark shadow-md">
        {isSupported && storySegment.text && (
          <button
            onClick={toggleNarration}
            className="p-3 bg-tertiary-dark hover:bg-accent-yellow text-accent-yellow hover:text-gray-900 rounded-full transition-all duration-200 shadow-md transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-orange"
            title={isSpeaking ? "Pause Narration" : "Narrate Story (Text-to-Speech)"}
            aria-label={isSpeaking ? "Pause Narration" : "Narrate Story"}
          >
            {isSpeaking ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
          </button>
        )}
        <button
            onClick={handleBookmark}
            disabled={isBookmarked && !isLoading}
            className={`p-3 rounded-full transition-all duration-200 shadow-md transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-orange
                        ${isBookmarked ? 'bg-accent-yellow text-gray-900 cursor-default' : 'bg-tertiary-dark hover:bg-accent-yellow text-accent-yellow hover:text-gray-900'}`}
            title={isBookmarked ? "Story Echo Saved" : "Save Story Echo (Bookmark)"}
            aria-label={isBookmarked ? "Story Echo Saved" : "Save Story Echo"}
        >
            {isBookmarked ? <BookmarkedIcon className="w-6 h-6" /> : <BookmarkIcon className="w-6 h-6" />}
        </button>
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center my-6 p-4 bg-secondary-dark/80 rounded-md text-accent-yellow border border-accent-yellow/30 shadow-lg">
          <SpinnerIcon className="w-6 h-6 mr-3 animate-spin" />
          <span className="font-luckiestguy text-lg">The Last Man ponders his next move...</span>
        </div>
      )}

      {!isLoading && storySegment.choices.length > 0 && (
        <div className="mt-10">
          <h3 className="font-bangers text-4xl sm:text-5xl text-accent-yellow mb-6 text-center text-glow-yellow text-stroke-black">WHAT NEXT?</h3>
          <div className="space-y-4">
            {storySegment.choices.map((choice, index) => (
              <InteractiveChoiceButton
                key={choice.id}
                index={index}
                choiceText={choice.text}
                onClick={() => handleChoice(choice.text)}
                disabled={isLoading}
              />
            ))}
          </div>
        </div>
      )}
       {!isLoading && storySegment.choices.length === 0 && storySegment.text && (
         <div className="mt-10 text-center p-6 content-container rounded-lg border-2 border-accent-yellow/30">
            <p className="font-luckiestguy text-2xl text-text-light mb-3">The path seems to end here... or does it?</p>
            <p className="text-text-medium mt-2 mb-6">Perhaps this is a moment of reflection, or the story has reached a natural pause. The wasteland keeps its secrets close.</p>
            <button
                onClick={() => {
                    initialLoadRef.current = true; 
                    setShowIntro(true);
                    setStorySegment(null);
                    setError(null);
                    // navigate(location.pathname, { replace: true }); 
                }}
                className="btn-primary"
            >
                Return to Wasteland's Edge
            </button>
         </div>
       )}
    </div>
  );
};

export default GamePage;