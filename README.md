# 🏋️ FitCoach AI - Fitness Chatbot

## 📖 Introduction

**FitCoach AI** is a modern, production-grade fitness chatbot built with cutting-edge web technologies. It provides intelligent, fitness-focused responses using OpenRouter AI, ensuring users get expert guidance on workouts, nutrition, weight management, and training techniques. The chatbot maintains conversation context for personalized interactions and incorporates intelligent filtering to stay focused exclusively on fitness topics.

## 💼 Use Case

FitCoach AI is designed for:
- **Fitness Enthusiasts** - Get personalized workout advice and training tips
- **Nutrition Seekers** - Receive diet, meal planning, and nutrition guidance
- **Weight Management** - Advice on weight loss, weight gain, and body composition
- **Recovery & Injury Prevention** - Learn proper recovery techniques and injury prevention strategies
- **Motivation & Coaching** - Get motivated with expert fitness psychology insights
- **Beginner & Advanced Trainers** - Customized recommendations for any fitness level

The chatbot intelligently filters requests to ensure responses are always fitness-related, maintaining focus on its core expertise.

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | Next.js 14 |
| **UI Library** | React 18 |
| **Styling** | Tailwind CSS 3 |
| **Language** | TypeScript |
| **AI Provider** | OpenRouter API |
| **HTTP Client** | Axios |
| **State Management** | React Hooks |
| **Package Manager** | npm

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm
- **OpenRouter API Key** ([Get it here](https://openrouter.ai))

### Setup

1. **Clone the repository**:
   ```bash
   cd ChatBotAI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

**Built with ❤️ for fitness enthusiasts worldwide.**

---

## 📝 Changelog

- v1.0.1: Fixed Vercel deployment build errors
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
ChatBotAI/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global Tailwind styles
│   └── components/
│       ├── Chat.tsx        # Main chat component
│       ├── Header.tsx      # Header with logo
│       └── Icons.tsx       # SVG icons
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── .eslintrc.json
```

## 🎯 Key Components

### 1. **Header Component** (`Header.tsx`)
- Logo and branding on top left
- Responsive navigation
- Mobile menu toggle
- Sticky positioning for easy access

### 2. **Chat Component** (`Chat.tsx`)
- Message display area with scrolling
- User and bot message differentiation
- Auto-scrolling to latest messages
- Real-time message timestamps
- Typing indicator for bot responses
- Input field with send button
- Keyboard support (Enter to send)
- Loading states
- **API Integration** - Connects to `/api/chat` for Gemini responses

### 3. **API Route** (`app/api/chat/route.ts`)
- Handles chat requests via POST
- Integrates with Google Gemini API
- Maintains conversation history
- Fitness-focused system prompt
- Error handling and validation
- Type-safe TypeScript implementation

### 4. **Icons Component** (`Icons.tsx`)
- Reusable SVG icons
- Send, bot, user, loading, and menu icons
- Lightweight and performant

## 🎨 Styling Features

- **Gradient backgrounds**: Beautiful linear and radial gradients
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Glass morphism**: Modern frosted glass effect
- **Smooth animations**: Transitions and hover effects
- **Custom scrollbars**: Styled for better UX
- **Color scheme**:
  - Primary: Indigo (#6366f1)
  - Secondary: Pink (#ec4899)
  - Neutral grays for balance

## 💡 Bot Capabilities

The chatbot provides intelligent responses for:
- 🏋️ **Workouts** - Exercise routines and training tips
- 🥗 **Nutrition** - Diet and eating tips
- ⚖️ **Weight Management** - Weight loss/gain strategies
- 🏃 **Cardio** - Cardio exercises and training
- 💪 **Strength Training** - Weightlifting routines
- 🌟 **Beginner Tips** - Getting started with fitness
- 😴 **Recovery** - Rest and recovery advice
- 🚀 **Motivation** - Fitness motivation and tips

## 🔧 Configuration

### Tailwind Configuration
Edit `tailwind.config.js` to customize colors, fonts, and other styles:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#6366f1',
      secondary: '#ec4899',
    },
  },
}
```

### Next.js Configuration
Modify `next.config.js` for additional Next.js settings.

## 📱 Responsive Breakpoints

- **Mobile**: Below 640px
- **Tablet**: 640px - 1024px
- **Desktop**: Above 1024px

Tailwind CSS breakpoints used: `sm`, `lg`, `xl`

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Chat history persistence
- [ ] Voice input support
- [ ] Multiple language support
- [ ] Workout plan generation
- [ ] Nutrition tracking
- [ ] User progress analytics
- [ ] Social sharing features
- [ ] Mobile app (React Native)

## 🔐 Security Best Practices

- Input sanitization
- XSS protection via React
- No sensitive data stored locally
- HTTPS ready for deployment
- Secure headers configured in Next.js

## 📊 Performance Optimization

- Image optimization via Next.js Image component
- Code splitting and lazy loading
- Minimized CSS with Tailwind purging
- Optimized bundle size
- Fast First Contentful Paint (FCP)

## 🌐 Deployment

### Environment Variables

Create `.env.local` with:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GEMINI_MODEL=gemini-pro
```

**Get your API key**: [Google AI Studio](https://aistudio.google.com/app/apikey)

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Auto-deploys on push

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms
- AWS Amplify
- Netlify
- GitHub Pages
- Self-hosted servers

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📧 Support

For questions or support, please open an issue in the repository.

---

**Made with ❤️ for the fitness community**
