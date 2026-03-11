import { defineField, defineType } from 'sanity'

export const sermonType = defineType({
  name: 'sermon',
  title: 'Sermons',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Sermon Title',
      validation: (Rule) => Rule.required().min(5).max(100),
      description: 'Enter the title of the sermon',
    }),
    defineField({
      name: 'preacher',
      type: 'string',
      title: 'Preacher',
      validation: (Rule) => Rule.required(),
      description: 'Name of the person preaching the sermon',
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date Preached',
      validation: (Rule) => Rule.required(),
      description: 'Select the date the sermon was preached',
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'YouTube Link',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
      description: 'Paste the full YouTube link (e.g., https://www.youtube.com/watch?v=...)',
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Sermon Summary',
      description: 'Optional short summary or notes about the sermon',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags / Categories',
      of: [{ type: 'string' }],
      description: 'Optional tags to categorize the sermon',
    }),
  ],

  // Optional: Customize how documents appear in the Studio
  preview: {
    select: {
      title: 'title',
      subtitle: 'preacher',
      media: 'videoUrl',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Untitled Sermon',
        subtitle: subtitle ? `Preacher: ${subtitle}` : 'No preacher assigned',
      }
    },
  },
})