import { useState } from "react";
import UrlForm from "./components/UrlForm";
import AdminPage from "./components/AdminPage"; // Assuming you have this component

export default function App() {
  const [view, setView] = useState("user"); // "user" or "admin"

  // A helper function to determine button classes, making the JSX cleaner
  const getButtonClasses = (buttonView) => {
    return `px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
      view === buttonView
        ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow"
        : "text-slate-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-800"
    }`;
  };

  return (
    // Main container with dark theme background
    <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-900 flex flex-col items-center py-10 transition-colors">
      
      {/* --- Header Section --- */}
      <header className="w-full max-w-lg mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-6">
          URL Shortener
        </h1>
        
        {/* Modern Segmented Control for View Toggling */}
        <div className="w-fit mx-auto bg-slate-200 dark:bg-slate-800 p-1 rounded-lg flex items-center">
          <button onClick={() => setView("user")} className={getButtonClasses("user")}>
            User View
          </button>
          <button onClick={() => setView("admin")} className={getButtonClasses("admin")}>
            Admin View
          </button>
        </div>
      </header>
      
      {/* --- Main Content Area --- */}
      <main>
        {view === "user" ? <UrlForm /> : <AdminPage />}
      </main>
      
    </div>
  );
}