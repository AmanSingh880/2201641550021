import React, { useState } from "react";
import axios from "axios";
import "./UrlShortener.css";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [expiresInMinutes, setExpiresInMinutes] = useState("");
  const [preferredCode, setPreferredCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await axios.post("http://localhost:5000/api/shorten", {
        url,
        expiresInMinutes: Number(expiresInMinutes),
        preferredCode: preferredCode || undefined,
      });

      setResult(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Something went wrong!");
      } else {
        setError("Backend not reachable");
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <label className="block mb-3">
          <span className="text-gray-700">Long URL:</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter your long URL"
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Expiry (minutes):</span>
          <input
            type="number"
            value={expiresInMinutes}
            onChange={(e) => setExpiresInMinutes(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            placeholder="e.g. 10"
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Preferred Code (optional):</span>
          <input
            type="text"
            value={preferredCode}
            onChange={(e) => setPreferredCode(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            placeholder="e.g. mylink123"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Shorten URL
        </button>
      </form>

      {error && (
        <p className="text-red-500 mt-4 font-medium">⚠️ {error}</p>
      )}

{result && (
  <div className="result-card">
    <p className="result-title">Success! Here's your link:</p>
    <div className="result-link-wrapper">
      <a
        href={result.shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="short-url-link"
      >
        {result.shortUrl}
      </a>
      <button 
        onClick={() => navigator.clipboard.writeText(result.shortUrl)} 
        className="copy-btn"
        title="Copy to clipboard"
      >
        {/* Simple SVG for a clipboard icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
    <p className="expiry-info">
      Expires at: {new Date(result.expiresAt).toLocaleString()}
    </p>
  </div>
)}
    </div>
  );
}
