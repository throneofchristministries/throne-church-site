// schemas/sermon.ts (updated)
import { defineType, defineField } from "sanity";

export default defineType({
  name: "sermon",
  title: "Sermon",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "speaker", title: "Speaker", type: "reference", to: [{ type: "speaker" }] }),
    defineField({ name: "date", title: "Date", type: "datetime" }),
    defineField({ name: "videoUrl", title: "Video URL", type: "url" }),
    defineField({ name: "audioUrl", title: "Audio URL", type: "url" }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});