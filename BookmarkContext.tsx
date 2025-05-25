
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Bookmark } from '../types';
import { getBookmarks as getBookmarksFromStorage, saveBookmark as saveBookmarkToStorage, deleteBookmark as deleteBookmarkFromStorage } from '../services/localStorageService';

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'storyPreview'> & { chatHistory: Bookmark['chatHistory'], currentStoryText: string, currentChoices: Bookmark['currentChoices'] }) => void;
  removeBookmark: (id: string) => void;
  getBookmarkById: (id: string) => Bookmark | undefined;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setBookmarks(getBookmarksFromStorage());
  }, []);

  const addBookmark = (bookmarkData: Omit<Bookmark, 'id' | 'createdAt' | 'storyPreview'> & { chatHistory: Bookmark['chatHistory'], currentStoryText: string, currentChoices: Bookmark['currentChoices'] }) => {
    const newBookmark: Bookmark = {
      ...bookmarkData,
      id: Date.now().toString(),
      createdAt: Date.now(),
      storyPreview: bookmarkData.currentStoryText.substring(0, 100) + (bookmarkData.currentStoryText.length > 100 ? '...' : ''),
    };
    const updatedBookmarks = saveBookmarkToStorage(newBookmark);
    setBookmarks(updatedBookmarks);
  };

  const removeBookmark = (id: string) => {
    const updatedBookmarks = deleteBookmarkFromStorage(id);
    setBookmarks(updatedBookmarks);
  };

  const getBookmarkById = (id: string): Bookmark | undefined => {
    return bookmarks.find(b => b.id === id);
  }

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, getBookmarkById }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};