# AIN Neighborhood Change Checker

## Overview

The AIN Neighborhood Change Checker is a tool designed to process and analyze neighborhood change data based on Assessor's Identification Numbers (AINs) or Federal Information Processing Standards (FIPS) codes. It integrates multiple datasets and APIs to fetch relevant geographic and socioeconomic data efficiently.

# Code Architecture

## Tech Stack

- Frontend: Next.js (React) with server-side rendering (SSR)

- Backend: Next.js API Routes for fetching GeoJSON

- Caching: In-memory storage for optimized GeoJSON retrieval (Was fetching in the server-side but there were errors with deployment so had to deploy as client side)

## APIs Used:

- FCC Census Block API for converting lat/lon to FIPS

- LACounty Open Data for AIN to lat/lon mapping

- GeoJSON from the Othering & Belonging Institute for neighborhood change data

# Data Flow

## User Input

- Accepts comma-separated AINs or FIPS codes from a form.

## AIN Processing

- Queries preprocessed AIN data to get latitude and longitude (proof of concept uses a locally processed CSV subset).

- Future improvement: Direct integration with ArcGIS API to avoid local CSV processing.

## FIPS Lookup

- Calls FCC Census Block API to fetch FIPS codes using latitude and longitude.

## Neighborhood Data Retrieval

- Uses FIPS codes to search a cached GeoJSON dataset for neighborhood change indicators.

## Rendering Results

- Displays the retrieved neighborhood change data in a formatted JSON output.



# Limitations & Future Work

## Current Constraints

## AIN Data Processing:

- Currently using a manually downloaded 3,000-row CSV subset from LACounty Open Data.

- Full dataset is 9 million rows, making local processing inefficient.

- Future approach: Direct API queries instead of local CSV processing.

## API Integration:

- ArcGIS API is not yet integrated due to time constraints.

- Future work: Fully integrate ArcGIS API for live AIN queries.

## Server-side rendering deployment

- Figure out how to deploy while doing server side fetching