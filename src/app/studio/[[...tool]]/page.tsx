"use client"; // This must be the first line

import { NextStudio } from 'next-sanity/studio'
import config from '@/../sanity.config'

// These exports are fine to stay, but the component above must be Client-side
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
