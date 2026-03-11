import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to see updates immediately
});

export async function getSermons() {
  return await client.fetch(
    `*[_type == "sermon"] | order(datePreached desc)`
  );
}
