import { metadata, viewport } from 'next-sanity/studio';
import { Studio } from './Studio';

// These can only be exported from a Server Component
export { metadata, viewport };

export default function StudioPage() {
  return <Studio />;
}
