const { json } = require("body-parser");
const express = require("express");
const path = require("node:path");
const PORT = process.env.PORT || 8000;
const app = express();

// static

// app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
];
//All
app.get("/api/posts", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
});
//Single
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post with id not found" });
  } else {
    res.status(200).json(post);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
