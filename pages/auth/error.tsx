import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const errors = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'Access denied.',
  Verification: 'The verification token has expired or has already been used.',
  Default: 'An error occurred during authentication.',
};

export default function AuthError() {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const { error: errorType } = router.query;
    if (errorType && typeof errorType === 'string') {
      setError(errors[errorType as keyof typeof errors] || errors.Default);
    }
  }, [router.query]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error || 'An unexpected error occurred'}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={() => router.push('/')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
} 