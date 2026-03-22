import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

<<<<<<< HEAD
export async function GET(_request: NextRequest) {
=======
export async function GET(request: NextRequest) {
>>>>>>> 57f0b4350c08f200a585272a6eda31f3c7b95d14
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 400 }
      );
    }

    const client = new GoogleGenerativeAI(API_KEY);
    
    // List available models
    const models = await client.listModels();
    
    const availableModels = models.map((model: any) => ({
      name: model.name,
      displayName: model.displayName,
      supportedGenerationMethods: model.supportedGenerationMethods,
    }));

    return NextResponse.json({
      success: true,
      models: availableModels,
      message: 'Available models for your API key',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
