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
  res.json(posts);
});
//Single
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
