'use client';

import { LogoIcon, MenuIcon, CloseIcon } from './Icons';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <LogoIcon />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  FitCoach AI
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Your Personal Fitness Assistant</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  FitCoach
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#"
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
              >
                About
              </a>
              <button className="btn-primary text-sm">Start Chat</button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95">
            <nav className="px-4 py-4 space-y-3">
              <a
                href="#"
                className="block text-gray-700 hover:text-primary font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-primary font-medium transition-colors"
              >
                About
              </a>
              <button className="w-full btn-primary text-sm">Start Chat</button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
