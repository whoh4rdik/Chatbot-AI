#!/bin/bash

# FitCoach AI - Quick Setup Script
# This script helps set up the fitness chatbot with Gemini API

echo "╔════════════════════════════════════════════════════════════╗"
echo "║      🏋️  FitCoach AI - Fitness Chatbot Setup              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js version
echo "✓ Checking Node.js version..."
node_version=$(node -v)
echo "  Using Node.js $node_version"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✓ Dependencies installed"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found"
    echo "📝 Creating .env.local..."
    cp .env.local.example .env.local
    echo "✓ .env.local created"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Get your Gemini API key from: https://aistudio.google.com/app/apikey"
    echo "   2. Edit .env.local and add your API key"
    echo "   3. Run: npm run dev"
else
    echo "✓ .env.local already exists"
    if grep -q "your_gemini_api_key_here" .env.local; then
        echo "⚠️  WARNING: Your .env.local still contains placeholder API key!"
        echo "📝 Please update .env.local with your actual Gemini API key"
        echo "   Get it from: https://aistudio.google.com/app/apikey"
    else
        echo "✓ API key appears to be configured"
    fi
fi
echo ""

# Build information
echo "ℹ️  Available commands:"
echo "   npm run dev    - Start development server"
echo "   npm run build  - Build for production"
echo "   npm start      - Start production server"
echo "   npm run lint   - Run ESLint"
echo ""

# Read more info
echo "📚 For detailed setup, see GEMINI_SETUP.md"
echo "📖 For API reference, see API_REFERENCE.md"
echo ""

echo "🚀 To start development server, run: npm run dev"
echo ""
