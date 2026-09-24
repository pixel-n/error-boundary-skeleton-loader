import React, { Component, useState, useEffect, Suspense, lazy } from 'react';
// Error Boundary Component 
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Update state so the next render shows fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI for caught errors
      return (
        <div className="p-4 border-2 border-red-500 bg-red-50 rounded-lg text-red-700 text-center">
          <h3 className="font-bold text-lg">Module Error Encountered</h3>
          <p className="text-sm my-2">{this.state.error?.message || "Something went wrong."}</p>
          <button 
            onClick={this.handleReset}
            className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition"
          >
            Reset Module
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

//  Skeleton Loading Component (Fallback UI) 
const SkeletonCard = () => (
  <div className="p-4 border rounded-lg shadow animate-pulse bg-white space-y-3">
    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

//  Component with Logic & Error Simulation 
const DataCard = ({ shouldError }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (shouldError) {
    throw new Error("Failed to load component data!");
  }

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h3 className="font-bold text-gray-800 text-lg">Active Data Module</h3>
      <p className="text-gray-600 text-sm mt-1">
        Content loaded cleanly without breaking the surrounding layout.
      </p>
    </div>
  );
};

// Main App Component
export default function App() {
  const [triggerError, setTriggerError] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col justify-between">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Advanced Patterns Demo</h1>
          <p className="text-gray-600 mt-1">Error Boundaries & Skeleton Loading</p>
        </header>

        <div className="flex justify-center">
          <button
            onClick={() => setTriggerError(!triggerError)}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded shadow hover:bg-indigo-700 transition"
          >
            Toggle Error State ({triggerError ? 'ON' : 'OFF'})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Section 1: Error Boundary Protection */}
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Stable Card</h2>
            <ErrorBoundary>
              <DataCard shouldError={false} />
            </ErrorBoundary>
          </div>

          {/* Section 2: Error Boundary Trapping Failure */}
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Isolated Fault Card</h2>
            <ErrorBoundary>
              <DataCard shouldError={triggerError} />
            </ErrorBoundary>
          </div>
        </div>
      </div>

      {/* --- Powered By Footer Section --- */}
      <footer className="max-w-2xl mx-auto w-full mt-12 pt-6 border-t border-gray-300">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">
          Powered By Architecture
        </h3>
        
        {/* Suspense handles async fallback UI */}
        <Suspense fallback={<SkeletonCard />}>
          <ErrorBoundary>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center space-y-2">
              <div className="flex flex-wrap justify-center gap-2">
                {/* Fallback UI Tag */}
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  Fallback UI
                </span>
                {/* Suspense Tag */}
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                  React Suspense
                </span>
                {/* Error Boundary Tag */}
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded">
                  Error Boundary
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Isolated resilience preventing top-level crashes using graceful fallback boundaries.
              </p>
            </div>
          </ErrorBoundary>
        </Suspense>
      </footer>
    </div>
  );
}

