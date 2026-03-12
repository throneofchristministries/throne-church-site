"use client";

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config'; // Adjust if your config is in a different spot

export function Studio() {
  return <NextStudio config={config} />;
}
