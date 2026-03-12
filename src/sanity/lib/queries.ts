const query = `*[_type == "sermon"] | order(date desc){
  title,
  preacher,
  date,
  videoUrl,
  audioUrl,
  series,
  description
}`