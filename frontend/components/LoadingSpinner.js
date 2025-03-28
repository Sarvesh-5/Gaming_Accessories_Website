'use client';
import React, { useEffect, useState } from 'react';

export default function LoadingSpinner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto" />
        <h2 className="text-zinc-900 mt-4 text-lg font-semibold">Loading...</h2>
        <p className="text-zinc-600 text-sm">Powering up your gaming experience</p>
      </div>
    </div>
  );
}
