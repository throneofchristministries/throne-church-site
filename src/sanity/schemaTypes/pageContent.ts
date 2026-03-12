// schemas/pageContent.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "pageContent",
  title: "Page Content",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Page Name",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});