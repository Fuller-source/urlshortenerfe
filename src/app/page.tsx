'use client';
import React from "react";
import Axios from "axios";
import { useState } from "react";

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
      setError("Failed to shorten URL");
      setShortUrl("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      hi 
    </div>
  );
}

