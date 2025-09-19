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
    <Card>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="url">Enter URL to shorten</Label>
        <Input
          id="url"
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>
      {/* Replace the below div with a shad componenet*/}
      <div>
        {shortUrl && (
          <div>
            <Label>Shortened URL:</Label>
            <a href={shortUrl}></a>
          </div>
        )}
      </div>
    </Card>
  );
}

