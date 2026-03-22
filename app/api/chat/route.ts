import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const API_BASE = 'https://openrouter.ai/api/v1';
const MODEL = 'openrouter/auto';

const FITNESS_SYSTEM_PROMPT = `You are FitCoach AI, a professional fitness advisor and personal training assistant. 

IMPORTANT RULES - YOU MUST FOLLOW:
1. ONLY answer questions related to fitness, exercise, workouts, nutrition, health, diet, weight management, training, etc.
2. If a question is NOT about fitness or health topics, you MUST respond with EXACTLY: "Sorry, but I can only answer fitness-related questions. Please ask me about workouts, nutrition, weight loss, strength training, recovery, or other fitness topics!"
3. Do NOT try to answer non-fitness questions. Do NOT provide general knowledge answers.
4. Examples of fitness topics: exercise routines, workout plans, nutrition advice, weight loss strategies, muscle building, cardiovascular health, recovery techniques, training methods, fitness goals, diet planning.
5. Examples of NON-fitness topics: politics, history, movies, recipes (unless fitness meal prep), career advice, relationships, general knowledge.

WHAT TO DO:
- Always provide safe, evidence-based fitness advice
- Be supportive and motivating
- Encourage users to consult healthcare professionals when needed
- Adapt responses to the user's fitness level
- Provide specific, actionable recommendations
- Keep responses concise but informative
- Maintain a professional, friendly tone
- Prioritize user safety

Remember: Your ONLY purpose is to help with fitness and health-related questions.`;

// Function to check if a message is fitness-related
function isFitnessRelated(text: string): boolean {
  const fitnessKeywords = [
    'workout', 'exercise', 'fitness', 'gym', 'training', 'weight', 'nutrition',
    'diet', 'meal', 'protein', 'calorie', 'strength', 'cardio', 'muscle',
    'stretch', 'yoga', 'running', 'walk', 'lift', 'squat', 'push up', 'pull up',
    'abs', 'bicep', 'tricep', 'chest', 'back', 'leg', 'core', 'weight loss',
    'weight gain', 'bulk', 'cut', 'recovery', 'sleep', 'injury', 'pain',
    'flexibility', 'endurance', 'stamina', 'breathe', 'heart rate', 'metabolism',
    'fat', 'lean', 'tone', 'ripped', 'jacked', 'sweat', 'burn', 'rep', 'set',
    'fitness goal', 'health', 'healthy', 'lean', 'athletic', 'body', 'physical',
    'warm up', 'cool down', 'stretch', 'foam roller', 'balance', 'agility',
    'boxing', 'mma', 'crossfit', 'pilates', 'zumba', 'dance fitness',
  ];

  const lowerText = text.toLowerCase();
  return fitnessKeywords.some(keyword => lowerText.includes(keyword));
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key is not configured' },
        { status: 500 }
      );
    }

    // Check if the user message is fitness-related
    if (!isFitnessRelated(message)) {
      return NextResponse.json({
        success: true,
        message: "Sorry, but I can only answer fitness-related questions. Please ask me about workouts, nutrition, weight loss, strength training, recovery, or other fitness topics!",
      });
    }

    // Format conversation history for OpenRouter API
    const messages = [
      {
        role: 'system',
        content: FITNESS_SYSTEM_PROMPT,
      },
      ...conversationHistory
        .filter((msg: any) => msg.sender === 'user' || msg.sender === 'bot')
        .map((msg: any) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        })),
      {
        role: 'user',
        content: message,
      },
    ];

    // Call OpenRouter API
    const response = await axios.post(
      `${API_BASE}/chat/completions`,
      {
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'FitCoach AI',
        },
      }
    );

    const botMessage = response.data.choices[0].message.content;

    return NextResponse.json({
      success: true,
      message: botMessage,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error.response?.data || error.message);

    let errorMessage = 'An error occurred while processing your request';

    if (error.response?.status === 401) {
      errorMessage = 'API key authentication failed. Please verify your OpenRouter API key.';
    } else if (error.response?.status === 429) {
      errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
    } else if (error.response?.status === 500) {
      errorMessage = 'Service temporarily unavailable. Please try again later.';
    }

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Fitness Chatbot API is running',
    apiConfigured: !!API_KEY,
    provider: 'OpenRouter',
  });
}
