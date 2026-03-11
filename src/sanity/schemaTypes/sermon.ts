import { defineType, defineField } from "sanity"

export const sermon = defineType({
  name: "sermon",
  title: "Sermons",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string"
    }),
    defineField({
      name: "preacher",
      title: "Preacher",
      type: "string"
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime"
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube Video URL",
      type: "url"
    })
  ]
})