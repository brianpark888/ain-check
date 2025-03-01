"use client";

import { useState } from "react";
import { handleSearch } from "@/utils/dataUtils";

export default function InteractiveClient({ geoJSON }) {
  const [results, setResults] = useState([]);

  return (
    <div>
      <form onSubmit={(e) => handleSearch(e, setResults, geoJSON)} className="mb-8">
        <label htmlFor="ain" className="block text-sm font-medium mb-2">
          Enter AINs (comma-separated)
        </label>
        <input
          id="ain"
          name="ain"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter AINs, e.g., 12345, 67890, 54321..."
        />
        <label htmlFor="fips" className="block text-sm font-medium mb-2 mt-4">
          Enter FIPS Codes (comma-separated)
        </label>
        <input
          id="fips"
          name="fips"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter FIPS, e.g., 06037501111, 06037502222..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2"
        >
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <ResultsTable results={results} />
        </div>
      )}
    </div>
  );
}


function ResultsTable({ results }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">FIPS</th>
            <th className="border border-gray-300 p-2">Neighborhood Change</th>
            <th className="border border-gray-300 p-2">Income Change 2000-2021</th>
            <th className="border border-gray-300 p-2">Income Change 2013-2021</th>
            <th className="border border-gray-300 p-2">Rent Change 2013-2021</th>
            <th className="border border-gray-300 p-2">Home Value Median</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className={`border border-gray-300 ${!result.myJson ? 'bg-yellow-200' : ''}`}>
              <td className="border border-gray-300 p-2">{result.fips}</td>
              <td className="border border-gray-300 p-2">{result.myJson ? result.myJson.nbrhood_chng : 'No Neighborhood Change'}</td>
              <td className="border border-gray-300 p-2">{result.myJson?.trct_inc_chng0021 ?? 'N/A'}</td>
              <td className="border border-gray-300 p-2">{result.myJson?.trct_inc_chng1321 ?? 'N/A'}</td>
              <td className="border border-gray-300 p-2">{result.myJson?.trct_pctchng_medrent1321 ?? 'N/A'}</td>
              <td className="border border-gray-300 p-2">{result.myJson?.home_value_median ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
