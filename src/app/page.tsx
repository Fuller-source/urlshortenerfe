'use client';
import React from "react";
import Axios from "axios";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Home(){
  // Function to shorten URL
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await Axios.post('/api/shorten', longUrl, {
        headers: {
          'Content-Type': 'text/plain',
        }
      });
      setShortUrl(`https://url-shortener-api-89bq.onrender.com/${response.data}`);
      setError("");
    } catch (err){
      setError(`Failed to shorten URL: ${(err as Error).message}`);
      setShortUrl("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 mt-8">URL Shortener</h1>

      {/* Main Card */}
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        
        {/* Form to input URL */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mt-4 p-4 bg-indigo-50 rounded-md">
          <Label htmlFor="url" className="font-semibold text-gray-700">Enter URL to shorten</Label>
          
          {/* Input and Button are now in a horizontal row */}
          <div className="flex items-center space-x-2">
            <Input
              id="url"
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="flex-grow cursor-text bg-white text-indigo-700 font-medium" // Takes up the remaining space
              placeholder="e.g., https://www.google.com"
              required
            />
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-24 bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap">
              {loading ? "Shortening..." : "Shorten URL"}
            </Button>
          </div>
        </form>

        {/* Display error message if any */}
        {error && (
          <div className="p-3 mb-4 text-center bg-red-100 text-red-700 rounded-md text-sm font-medium">
            {error}
          </div>
        )}

        {/* Shortened URL Output Section */}
          {shortUrl && (
            <div className="flex flex-col space-y-2 mt-4 p-4 bg-indigo-50 rounded-md">
              <Label>Shortened URL:</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  value={shortUrl}
                  readOnly
                  className="flex-grow cursor-text bg-white text-indigo-700 font-medium"
                />
                <Button 
                  className="w-24 bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap"
                  onClick={() => navigator.clipboard.writeText(shortUrl)
                    .then(() => {
                      setCopyMessage("Copied!");
                      setTimeout(() => setCopyMessage(""), 3000);
                    })
                }>
                  Copy URL
                </Button>
              </div>

              {/* Copy confirmation message */}
              {copyMessage && (
                <p className="text-green-500 pt-1 text-sm font-medium animate-pulse">
                  {copyMessage}
                </p>
              )}

            </div>
          )}
      </Card>
    </div>
  );
}

