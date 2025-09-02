'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyBookingsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/my-bookings-modern');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <p>Redirecting to modern bookings page...</p>
    </div>
  );
}
