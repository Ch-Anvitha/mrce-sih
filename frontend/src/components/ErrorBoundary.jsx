import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
          <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">Something went wrong</h1>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            We apologize for the inconvenience. An unexpected error occurred while loading this page.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-white hover:bg-primary/90 px-8"
          >
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
