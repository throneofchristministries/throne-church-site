import { createClient } from 'next-sanity';

// 1. Updated Sanity Client Configuration
const client = createClient({
  projectId: "lhudqnko", // Corrected Project ID from your screenshot
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: false,
});
