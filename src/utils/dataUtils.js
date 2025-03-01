import ainData from "@/data/ain_data.json";

export function getAinCoordinates(ain) {
  return ainData[ain] || null;
}

export async function getFipsCode(longitude, latitude) {
  try {
    const url = `https://geo.fcc.gov/api/census/block/find?latitude=${latitude}&longitude=${longitude}&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch FIPS code");
    }

    const data = await response.json();

    if (!data.Block?.FIPS) {
      return null;
    }

    return data.Block.FIPS.substring(0, 11); // Return full FIPS code
  } catch (error) {
    console.error("Error fetching FIPS code:", error);
    return null;
  }
}

export async function handleSearch(event, setResults, geoJSON) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const ainInput = formData.get("ain")?.trim();
  const fipsInput = formData.get("fips")?.trim();

  let results = [];

  if (ainInput) {
    const ainList = ainInput.split(",").map((ain) => ain.trim()).filter(Boolean);

    const ainResults = await Promise.all(
      ainList.map(async (ain) => {
        const coordinates = getAinCoordinates(ain);
        if (!coordinates) {
          return { ain, error: "Coordinates not found" };
        }

        const fipsCode = await getFipsCode(coordinates.long, coordinates.lat);
        if (!fipsCode) {
          return { ain, fipsCode: "FIPS not found" };
        }
        const myJson = geoJSON[fipsCode] || "FIPS not found";

        return { ain, fipsCode, myJson };
      })
    );
    results = results.concat(ainResults);
  }

  if (fipsInput) {
    const fipsList = fipsInput.split(",").map((fips) => fips.trim()).filter(Boolean);

    const fipsResults = fipsList.map((fips) => {
      return { fips, myJson: geoJSON[fips] || "FIPS not found" };
    });
    results = results.concat(fipsResults);
  }

  setResults(results);
}
