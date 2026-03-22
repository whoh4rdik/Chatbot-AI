import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'API is running with OpenRouter',
      provider: 'OpenRouter',
      model: 'openrouter/auto',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
