import { defineQuery } from "next-sanity";

export const SERMONS_QUERY = defineQuery(`*[_type == "sermon"] | order(date desc) {
  _id,
  title,
  preacher,
  date,
  videoUrl,
  summary
}`);
