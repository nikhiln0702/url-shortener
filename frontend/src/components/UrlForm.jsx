import { useState } from "react";
import axios from "axios";
import CopyableLink from "./CopyableLink"; // Import the child component
import { LinkIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function UrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Handles the form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      // For demonstration, let's simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      const res = await axios.post(`${apiUrl}/api/shorten`, {
        originalUrl: longUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
        console.error(err);
      setError(err.response?.data?.error || "Couldn't shorten that link. Please try another.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container with dark mode classes
    <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg dark:shadow-black/40 w-full max-w-lg transition-all">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-2">URL Shortener</h1>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-6">Create a short and shareable link in seconds.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Input field with icon */}
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
          <input
            type="url"
            placeholder="Enter a long URL to make it short..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500"
            required
            disabled={loading}
          />
        </div>

        {/* Submit button with loading state */}
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
          disabled={loading || !longUrl}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Shortening...
            </>
          ) : "Shorten URL"}
        </button>
      </form>

      {/* Result area: shows error or success */}
      <div className="mt-6 min-h-[76px]"> {/* Added min-height to prevent layout shift */}
        {error && (
          <div className="flex items-center gap-3 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 p-3 rounded-lg">
            <ExclamationCircleIcon className="h-6 w-6"/>
            <span>{error}</span>
          </div>
        )}
        {shortUrl && <CopyableLink shortUrl={shortUrl} />}
      </div>
    </div>
  );
}