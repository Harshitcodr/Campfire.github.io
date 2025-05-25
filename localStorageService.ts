
import { Bookmark } from '../types';

const BOOKMARKS_KEY = 'lastMan_bookmarks_v1';

export const getBookmarks = (): Bookmark[] => {
  try {
    const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  } catch (error) {
    console.error("Error retrieving bookmarks from localStorage:", error);
    return [];
  }
};

export const saveBookmark = (bookmark: Bookmark): Bookmark[] => {
  const bookmarks = getBookmarks();
  // Prevent duplicate IDs, though timestamp-based IDs should be unique
  const existingIndex = bookmarks.findIndex(b => b.id === bookmark.id);
  if (existingIndex > -1) {
    bookmarks[existingIndex] = bookmark; // Update if exists
  } else {
    bookmarks.push(bookmark);
  }
  // Sort by creation date, newest first
  bookmarks.sort((a, b) => b.createdAt - a.createdAt);
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error("Error saving bookmark to localStorage:", error);
  }
  return bookmarks;
};

export const deleteBookmark = (bookmarkId: string): Bookmark[] => {
  let bookmarks = getBookmarks();
  bookmarks = bookmarks.filter(b => b.id !== bookmarkId);
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error("Error deleting bookmark from localStorage:", error);
  }
  return bookmarks;
};

export const getBookmarkById = (bookmarkId: string): Bookmark | undefined => {
  const bookmarks = getBookmarks();
  return bookmarks.find(b => b.id === bookmarkId);
};