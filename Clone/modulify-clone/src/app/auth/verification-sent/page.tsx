'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

function VerificationSentContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendStatus('idle');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Error resending verification email:', error);
        setResendStatus('error');
      } else {
        setResendStatus('success');
      }
    } catch (err) {
      console.error('Unexpected error resending verification email:', err);
      setResendStatus('error');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Verification Email Sent</h1>
          <p className="text-gray-600 mb-6">
            We've sent a verification email to <strong>{email}</strong>. Please check your inbox and
            click the verification link to complete your registration.
          </p>

          <div className="text-gray-600 p-4 bg-gray-50 rounded-lg mb-6 text-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Troubleshooting Tips:</h3>
            <ul className="list-disc list-inside space-y-2 text-left">
              <li>Check your <strong>spam or junk folder</strong> - verification emails sometimes end up there</li>
              <li>Make sure the email address you entered is correct</li>
              <li>Some email providers may delay delivery - please be patient</li>
              <li>Add <strong>noreply@supabase.io</strong> to your contacts list to ensure future emails arrive properly</li>
              <li>If you still can't find the email, try the resend button below</li>
            </ul>
          </div>

          <div className="mb-6">
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className={`w-full py-2 px-4 rounded-md transition-colors ${
                isResending
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isResending ? 'Sending...' : 'Resend Verification Email'}
            </button>

            {resendStatus === 'success' && (
              <p className="mt-2 text-sm text-green-600">
                Verification email resent successfully! Please check your inbox.
              </p>
            )}

            {resendStatus === 'error' && (
              <p className="mt-2 text-sm text-red-600">
                There was an error resending the verification email. Please try again later.
              </p>
            )}
          </div>

          <div className="mt-8">
            <Link
              href="/auth/sign-in"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerificationSentPage() {
  return (
    <Suspense fallback={
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg p-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <VerificationSentContent />
    </Suspense>
  );
}
