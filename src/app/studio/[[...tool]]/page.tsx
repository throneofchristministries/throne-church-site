import { metadata, viewport } from 'next-sanity/studio';
import { Studio } from './Studio';

// Server-side exports are now allowed because this file is a Server Component
export { metadata, viewport };

export default function StudioPage() {
  return <Studio />;
}
