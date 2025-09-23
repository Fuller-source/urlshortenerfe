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
      setShortUrl(`http://localhost:8080/${response.data}`);
      setError("");
    } catch (err){
      setError(`Failed to shorten URL: ${(err as Error).message}`);
      setShortUrl("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center bg-gray-400 justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">URL Shortener</h1>
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="url">Enter URL to shorten</Label>
            <Input
              id="url"
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Shortening..." : "Shorten URL"}
          </Button>
        </form>
        {/* Replace the below div with a shad componenet*/}
          {!shortUrl && ( // change back to shortUrl when nonnegation when ready
            <div className="flex flex-col space-y-2">
              <Label>Shortened URL:</Label>
              <div className="flex items-center space-x-2">
                <Input value={shortUrl} readOnly className="flex-grow"/>
                <Button onClick={() => navigator.clipboard.writeText(shortUrl)
                    .then(() => alert("Copied to clipboard"))
                    .catch((err) => alert(`Failed to copy: ${err}`))
                }>Copy</Button>
              </div>
            </div>
          )}
      </Card>
      {error && <p className="text-red-500 mb-4">{error}</p>}
    </div>
  );
}

