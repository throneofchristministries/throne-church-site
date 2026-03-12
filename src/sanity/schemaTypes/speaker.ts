// schemas/speaker.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "speaker",
  title: "Speaker",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
    }),
    defineField({
      name: "socials",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
  ],
});