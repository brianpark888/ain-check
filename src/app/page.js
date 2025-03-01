'use client';

import InteractiveClient from "@/components/InteractiveClient";
import { useState, useEffect } from "react";

export default function Home() {  // ✅ Remove async
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/fetch-geojson')
      .then(res => res.json())
      .then(setData)
      .catch(error => console.error("API error:", error));
  }, []);

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">AIN Neighborhood Change Checker</h1>

      {/* Pass data to Client Component */}
      <InteractiveClient />
    </main>
  );
}
