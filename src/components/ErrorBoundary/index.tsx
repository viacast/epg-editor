import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{error?.message}</p>
        </div>
      );
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export default ErrorBoundary;
