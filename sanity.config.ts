"use client"; // This must be the very first line

import { defineConfig } from 'sanity'
import { schema } from './src/sanity/schemaTypes'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema, 
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
