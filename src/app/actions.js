"use server"

import { getAinCoordinates, getFipsCode, checkNeighborhoodChange } from "@/utils/dataUtils"

/**
 * Process a list of AINs to check if they fall within neighborhood change areas
 * @param {string} ainInput - Comma-separated list of AINs
 * @returns {Promise<Array>} - Array of results for each AIN
 */
export async function processAins(ainInput) {
  // Clean and parse input
  const ains = ainInput
    .split(",")
    .map((ain) => ain.trim())
    .filter((ain) => ain.length > 0)

  // Remove duplicates
  const uniqueAins = [...new Set(ains)]

  if (uniqueAins.length === 0) {
    throw new Error("Please enter at least one valid AIN")
  }

  const results = []

  for (const ain of uniqueAins) {
    try {
      // Get coordinates for the AIN
      const coordinates = getAinCoordinates(ain)

      if (!coordinates) {
        results.push({
          ain,
          fipsCode: null,
          inNeighborhoodChange: false,
          neighborhoodChangeValue: null,
          error: "AIN not found in database",
        })
        continue
      }

      // Get FIPS code from coordinates
      const fipsCode = await getFipsCode(coordinates.long, coordinates.lat)

      if (!fipsCode) {
        results.push({
          ain,
          fipsCode: null,
          inNeighborhoodChange: false,
          neighborhoodChangeValue: null,
          error: "Could not determine FIPS code",
        })
        continue
      }

      // Check if FIPS code exists in neighborhood change data
      const neighborhoodChangeData = checkNeighborhoodChange(fipsCode)

      results.push({
        ain,
        fipsCode,
        inNeighborhoodChange: neighborhoodChangeData !== null,
        neighborhoodChangeValue: neighborhoodChangeData,
        error: null,
      })
    } catch (error) {
      results.push({
        ain,
        fipsCode: null,
        inNeighborhoodChange: false,
        neighborhoodChangeValue: null,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  return results
}

