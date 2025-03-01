import InteractiveClient from "@/components/InteractiveClient";

export default async function Home() {
  // Fetch GeoJSON on the server (Runs only on the server)
  const response = await fetch(`http://localhost:3001/api/fetch-geojson`);

  const geoJSON = await response.json();

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">AIN Neighborhood Change Checker</h1>

      {/* Pass data to Client Component */}
      <InteractiveClient geoJSON={geoJSON} />
    </main>
  );
}
