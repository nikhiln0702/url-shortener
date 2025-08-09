import { useEffect, useState } from "react";
import axios from "axios";
import { ExclamationTriangleIcon, TableCellsIcon } from "@heroicons/react/24/outline";

export default function AdminPage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/admin`)
      .then(res => {
        setUrls(res.data);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load admin data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 1. Loading State
  if (loading) {
    // Skeleton loader for a better UX while data is fetching
    return (
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Admin Dashboard</h2>
        <div className="w-full animate-pulse">
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-t-lg"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-slate-100 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700"></div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg w-full max-w-4xl flex flex-col items-center justify-center text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mb-4"/>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">An Error Occurred</h3>
            <p className="text-slate-500 dark:text-slate-400">{error}</p>
        </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Admin Dashboard</h2>
      
      {/* 3. Empty State or Table */}
      {urls.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
            <TableCellsIcon className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600"/>
            <h3 className="mt-2 text-lg font-semibold text-slate-800 dark:text-white">No URLs Found</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Shorten some links in the user view to see them here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-100 dark:bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3">Short URL</th>
                <th scope="col" className="px-6 py-3">Original URL</th>
                <th scope="col" className="px-6 py-3 text-center">Visits</th>
                <th scope="col" className="px-6 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => (
                <tr key={url._id} className="bg-white dark:bg-slate-900 border-b last:border-b-0 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    <a href={`${apiUrl}/${url.shortCode}`} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      {url.shortCode}
                    </a>
                  </td>
                  <td className="px-6 py-4 truncate max-w-sm">{url.originalUrl}</td>
                  <td className="px-6 py-4 text-center font-medium text-slate-900 dark:text-white">{url.visits}</td>
                  <td className="px-6 py-4">{new Date(url.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}