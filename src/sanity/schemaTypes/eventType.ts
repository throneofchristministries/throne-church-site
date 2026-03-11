import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Church Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Event Title',
      validation: (Rule) => Rule.required().min(5),
      description: 'Name of the event',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Event Date & Time',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      validation: (Rule) => Rule.required(),
      description: 'Where the event will take place',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Short description of the event',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Event Image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'image',
    },
  },
})