import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest){
    const requestText = await req.text();
    const urlShortenBE = 'http://localhost:8080/shorten' // This will need to change
    
    const response = await fetch(urlShortenBE, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: requestText,
    })

    if (!response.ok){
        const errorText = await response.text()
        return new Response(`External API error: ${errorText}`,  {status: response.status})
    }

    return response
}