
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBookmarks } from '../contexts/BookmarkContext';
import { BookmarkedIcon } from '../components/icons/BookmarkedIcon'; // Using filled icon for visual theme
// Fix: Update import to use the correctly named NavCampfireIcon component
import { NavCampfireIcon } from '../components/icons/CampfireIcon';

const BookmarksPage: React.FC = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const navigate = useNavigate();

  const handleLoadBookmark = (bookmarkId: string) => {
    navigate(`/game?bookmarkId=${bookmarkId}`);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center p-8 min-h-[60vh] flex flex-col justify-center items-center content-container rounded-xl">
        <NavCampfireIcon className="w-32 h-32 mx-auto text-tertiary-dark opacity-60 mb-6 animate-pulse" />
        <h1 className="font-bangers text-5xl text-accent-yellow mb-4 text-glow-yellow text-stroke-black">No Echoes Saved</h1>
        <p className="text-text-medium mb-8 max-w-md">
          The winds of the wasteland have swept through your memories... You haven't saved any moments yet.
          Forge a path and etch your story in time.
        </p>
        <Link
          to="/game"
          className="btn-primary"
        >
          Forge a New Path
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-bangers text-6xl sm:text-7xl text-accent-yellow mb-10 text-center tracking-wider text-glow-yellow text-stroke-black filter drop-shadow-[0_0_5px_var(--color-accent-orange)]">Saved Echoes</h1>
      <div className="space-y-8">
        {bookmarks.map((bookmark) => (
          <div 
            key={bookmark.id} 
            className="bg-secondary-dark/70 p-5 sm:p-6 rounded-xl shadow-2xl border-2 border-tertiary-dark hover:border-accent-yellow/70 transition-all duration-300 ease-in-out transform hover:scale-[1.02] group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-grow">
                <h2 className="font-luckiestguy text-2xl sm:text-3xl text-accent-orange group-hover:text-accent-yellow transition-colors duration-300 filter drop-shadow-[0_0_2px_black]">{bookmark.name}</h2>
                <p className="text-xs text-text-medium font-mono">
                  [Echo logged: {new Date(bookmark.createdAt).toLocaleString()}]
                </p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to let the echo "${bookmark.name}" fade into the wasteland? This action cannot be undone.`)) {
                    removeBookmark(bookmark.id);
                  }
                }}
                className="ml-4 text-red-500 hover:text-red-300 transition-colors text-sm font-semibold py-1 px-2 rounded bg-tertiary-dark hover:bg-red-700/50 border border-red-500/50"
                title="Let Echo Fade (Delete)"
                aria-label={`Delete bookmark ${bookmark.name}`}
              >
                Forget
              </button>
            </div>
            <p className="text-text-light italic mb-5 line-clamp-3 p-3 bg-tertiary-dark/50 rounded-md border-l-4 border-accent-yellow/50">
              "{bookmark.storyPreview}"
            </p>
            <button
              onClick={() => handleLoadBookmark(bookmark.id)}
              className="w-full px-4 py-3 bg-accent-yellow text-gray-900 font-bangers text-xl sm:text-2xl rounded-lg shadow-md hover:bg-accent-orange transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400"
              aria-label={`Relive the moment from bookmark ${bookmark.name}`}
            >
              Relive This Moment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksPage;