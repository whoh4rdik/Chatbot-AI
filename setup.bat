@echo off
REM FitCoach AI - Quick Setup Script (Windows)
REM This script helps set up the fitness chatbot with Gemini API

cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║      🏋️  FitCoach AI - Fitness Chatbot Setup              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check Node.js version
echo ✓ Checking Node.js version...
for /f "tokens=*" %%i in ('node -v') do set node_version=%%i
echo   Using Node.js %node_version%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
echo ✓ Dependencies installed
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo ⚠️  .env.local not found
    echo 📝 Creating .env.local...
    copy .env.local.example .env.local
    echo ✓ .env.local created
    echo.
    echo 📋 Next steps:
    echo    1. Get your Gemini API key from: https://aistudio.google.com/app/apikey
    echo    2. Edit .env.local and add your API key
    echo    3. Run: npm run dev
) else (
    echo ✓ .env.local already exists
    findstr /m "your_gemini_api_key_here" .env.local >nul
    if %errorlevel%==0 (
        echo ⚠️  WARNING: Your .env.local still contains placeholder API key!
        echo 📝 Please update .env.local with your actual Gemini API key
        echo    Get it from: https://aistudio.google.com/app/apikey
    ) else (
        echo ✓ API key appears to be configured
    )
)
echo.

REM Build information
echo ℹ️  Available commands:
echo    npm run dev    - Start development server
echo    npm run build  - Build for production
echo    npm start      - Start production server
echo    npm run lint   - Run ESLint
echo.

REM Read more info
echo 📚 For detailed setup, see GEMINI_SETUP.md
echo 📖 For API reference, see API_REFERENCE.md
echo.

echo 🚀 To start development server, run: npm run dev
echo.
pause
