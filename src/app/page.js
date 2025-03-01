'use client';

import InteractiveClient from "@/components/InteractiveClient";
import { useState, useEffect } from "react";

export default function Home() { 

  const [data, setData] = useState(null);

  // Have to fetch in client side for the vercel deployment work
  // Server Side locally works - but I am short on time to get it to work on Vercel
  useEffect(() => {
    fetch('/api/fetch-geojson')
      .then(res => res.json())
      .then(setData)
      .catch(error => console.error("API error:", error));
  }, []);

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">AIN Neighborhood Change Checker</h1>

      <InteractiveClient geoJSON={data} />
    </main>
  );
}
