
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import AboutPage from './pages/AboutPage';
import BookmarksPage from './pages/BookmarksPage';
import CommunityPage from './pages/CommunityPage'; // Added
import { BookmarkProvider } from './contexts/BookmarkContext';
// Fix: Update import to use the correctly named NavCampfireIcon component
import { NavCampfireIcon } from './components/icons/CampfireIcon'; 

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <main key={location.pathname} className="flex-grow container mx-auto p-4 sm:p-8 lg:p-10 fade-in">
      {children}
    </main>
  );
};

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};


const App: React.FC = () => {
  const [isNavScrolled, setIsNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BookmarkProvider>
      <HashRouter>
        <div className="min-h-screen bg-primary-dark text-text-light flex flex-col">
          <nav className={`bg-secondary-dark/80 backdrop-blur-lg shadow-2xl p-4 sticky top-0 z-50 ${isNavScrolled ? 'nav-scrolled' : ''}`}>
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="flex items-center text-3xl sm:text-4xl font-bangers text-accent-yellow hover:text-accent-orange transition-colors duration-300 text-glow-yellow">
                <NavCampfireIcon className="w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3 animate-pulse-glow filter drop-shadow-[0_0_8px_var(--color-accent-orange)]" />
                <span className="transform hover:scale-105 transition-transform">Last Man: Nuclear Bloom</span>
              </Link>
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/game', label: 'Play' },
                  { path: '/bookmarks', label: 'Echoes' },
                  { path: '/about', label: 'Lore' },
                  { path: '/community', label: 'Nexus' }, 
                ].map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-2 py-1 sm:px-3 sm:py-2 rounded-md font-luckiestguy text-xs sm:text-base transition-all duration-300 transform hover:scale-105 
                       ${ isActive
                          ? 'bg-accent-yellow text-text-dark shadow-lg animate-pulse-glow ring-2 ring-accent-orange ring-offset-2 ring-offset-secondary-dark'
                          : 'text-text-medium hover:bg-tertiary-dark hover:text-accent-yellow'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                {/* Login/Signup buttons removed */}
              </div>
            </div>
            <div className="nav-border bg-tertiary-dark/70 container mx-auto h-[2px] mt-2"></div> {/* Div for border */}
          </nav>

          <PageWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/community" element={<CommunityPage />} /> 
            </Routes>
          </PageWrapper>

          <footer className="bg-secondary-dark/90 border-t-2 border-tertiary-dark/70 text-center p-6 sm:p-8 text-sm text-text-medium shadow-inner_top_lg">
            <p className="font-luckiestguy text-base sm:text-lg">&copy; {new Date().getFullYear()} Nuclear Bloom Studios.</p>
            <p className="text-xs sm:text-sm mt-1 italic animate-flicker">The wasteland whispers... tread carefully, survivor.</p>
          </footer>
          <ScrollToTopButton />
        </div>
      </HashRouter>
    </BookmarkProvider>
  );
};

export default App;