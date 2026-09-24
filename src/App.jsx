import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SkeletonLoader } from './components/SkeletonLoader';

// Dynamic User Profile card without avatar
const UserProfile = ({ triggerBug }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setUser({
        name: "Nawal Dev",
        profile: {
          bio: "Frontend engineer building responsive React applications with modern UI patterns.",
          role: "Software engineer"
        }
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [triggerBug]);

  // Throw runtime error to test the Error Boundary fallback
  if (triggerBug) {
    throw new Error("Failed to fetch user endpoint. Server responded with 500.");
  }

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
      <div className="flex items-center justify-between">
        <div>
          {/* Optional chaining safely prevents crashes on missing data */}
          <h2 className="text-lg font-bold text-slate-900">{user?.name}</h2>
          <span className="inline-block mt-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
            {user?.profile?.role ?? "Standard Member"}
          </span>
        </div>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed">
        {user?.profile?.bio}
      </p>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Status: <strong className="text-emerald-600 font-medium">● Active</strong></span>
        <span>ID: #8942</span>
      </div>
    </div>
  );
};

// Fallback UI caught by Error Boundary
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-6 text-center space-y-3">
    <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
      !
    </div>
    <div>
      <h3 className="font-semibold text-rose-900 text-sm">Component Failure Intercepted</h3>
      <p className="text-xs text-rose-600 mt-1 font-mono">{error?.message}</p>
    </div>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 active:scale-95 transition-all shadow-sm"
    >
      Recover Component
    </button>
  </div>
);

// Main Entry Component
export default function App() {
  const [triggerBug, setTriggerBug] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 flex justify-center items-start pt-16 px-4 font-sans text-slate-800">
      <main className="w-full max-w-md space-y-5">
        <header className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">User Dashboard</h1>
          <p className="text-xs text-slate-500">
            Isolated error boundaries & async skeleton states
          </p>
        </header>

        {/* Toggle button to test Error Boundary UI */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setTriggerBug((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              triggerBug
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {triggerBug ? 'Disable Error State' : 'Simulate Runtime Error'}
          </button>
        </div>

        {/* Functional Error Boundary */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setTriggerBug(false)}
        >
          <UserProfile triggerBug={triggerBug} />
        </ErrorBoundary>
      </main>
    </div>
  );
}
