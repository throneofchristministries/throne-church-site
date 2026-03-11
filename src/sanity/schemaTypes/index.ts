import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { sermonType } from './sermonType'
import { eventType } from './eventType' // fixed import

// Export the schema with all your types
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    sermonType,
    eventType,
    // Remove duplicate `sermon` import if it's the same as sermonType
  ],
}