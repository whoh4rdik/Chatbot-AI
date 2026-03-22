import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fitness Chatbot | Your Personal AI Fitness Assistant',
  description: 'Get expert fitness advice instantly with our AI-powered fitness chatbot. Ask questions about workouts, nutrition, and fitness goals.',
  keywords: ['fitness', 'chatbot', 'ai', 'workout', 'health'],
  authors: [{ name: 'Fitness Chatbot Team' }],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
