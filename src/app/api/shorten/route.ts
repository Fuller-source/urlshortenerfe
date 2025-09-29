import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const longUrl = await request.text();
    const backendUrl = 'https://url-shortener-api-8jbq.onrender.com/shorten';

    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: longUrl,
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      return new NextResponse(`Backend error: ${errorText}`, { status: backendResponse.status });
    }

    // Corrected Part: Read the text from the response and create a new one.
    const shortKey = await backendResponse.text();
    return new NextResponse(shortKey, { status: 200 });

  } catch (error) {
    console.error('Error in POST /shorten:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}