let cachedData = null;  // Store cached response

export async function GET() {
    if (cachedData) {
        return new Response(JSON.stringify(cachedData), {
            headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=31536000, immutable" }, // 1 year cache
        });
    }


    try {
        const url = "https://belonging.berkeley.edu/sites/default/files/external_pages/unpacked/11333/data/final_2024.geojson";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch GeoJSON");

        const data = await response.json();
        const myData = {};

        for (let feature of data.features) {
            let props = feature.properties;
            if (props["nbrhood_chng"] === 1) {
                myData[props["fips"]] = {
                    "nbrhood_chng": props["nbrhood_chng"],
                    "trct_raceeth_chng0021": props["trct_raceeth_chng0021"],
                    "trct_raceeth_chng1321": props["trct_raceeth_chng1321"],
                    "trct_inc_chng0021": props["trct_inc_chng0021"],
                    "trct_inc_chng1321": props["trct_inc_chng1321"],
                    "inc_half0021": props["inc_half0021"],
                    "inc_half1321": props["inc_half1321"],
                    "inc_quarter1321": props["inc_quarter1321"],
                    "trct_pctchng_medrent1321": props["trct_pctchng_medrent1321"],
                    "rent_half1321": props["rent_half1321"],
                    "home_value": props["home_value"],
                    "home_value_median": props["home_value_median"],
                    "home_value_score": props["home_value_score"],
                    "pct_gap": props["pct_gap"]
                };
            }
        }
        
        cachedData = myData; // Store data permanently

        return new Response(JSON.stringify(myData), {
            headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=31536000, immutable" }, // 1 year client-side cache
        });
    } catch (error) {
        console.error("Error fetching or writing data:", error);
    }
}
