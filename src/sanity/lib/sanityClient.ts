import { createClient } from "next-sanity"
export const client = createClient({
  projectId: "lhudqnko",
  dataset: "production",
  apiVersion: "2026-03-11",
  useCdn: false,
})