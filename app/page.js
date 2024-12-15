'use client';
import { useEffect, useState } from 'react';
import HomePage from '@/app/pages/HomePage/HomePage';

export default function Home() {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <HomePage />
  );
}
