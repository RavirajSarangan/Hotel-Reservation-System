'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect to dashboard
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Redirecting to Admin Dashboard...</h1>
        <p className="text-gray-600">Please wait while we load the admin interface.</p>
      </div>
    </div>
  );
}
