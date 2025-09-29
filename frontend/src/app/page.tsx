// src/app/page.tsx
'use client'; // Jadikan ini Client Component untuk mengakses localStorage & hooks

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 1. Periksa apakah ada token di penyimpanan browser
    const token = localStorage.getItem('auth_token');

    if (token) {
      // 2. Jika ADA token, arahkan ke dashboard
      router.push('/dashboard');
    } else {
      // 3. Jika TIDAK ADA token, arahkan ke halaman login
      router.push('/login');
    }
  }, [router]); // Jalankan efek ini sekali saat komponen dimuat

  // Tampilkan pesan loading selagi proses redirect berjalan
  return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
  );
}