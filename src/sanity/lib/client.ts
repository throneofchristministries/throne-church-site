import { createClient } from 'next-sanity';

// 1. Add "export" here so other files can see it
export const client = createClient({
  projectId: "lhudqnko", 
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: false,
});
