'use client';

import Header from './components/Header';
import Chat from './components/Chat';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 min-h-0 overflow-y-auto flex flex-col">
        <div className="flex-1 min-h-0 max-w-6xl w-full mx-auto flex flex-col px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Chat Section */}
          <div className="flex-1 min-h-0 flex flex-col">
            <Chat />
          </div>
        </div>
      </main>

      {/* Footer - Optional */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200/50 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            © 2024 FitCoach AI. Designed with ❤️ for your fitness journey.
          </p>
        </div>
      </footer>
    </div>
  );
}
